import { defaultDataProvider, type DataProvider, type Identifier } from "react-admin";
import { apiUrl, httpClient } from "../httpClient";

// Mirrors the API's GET/PUT /api/home-page response (src/PortfolioCms.Api/Dtos/HomePageDto.cs and Models/*).
// Keep in sync when the API changes.
export type HeroStat = {
    label: string;
    value: string;
};

export type HeroSection = {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
    stats: HeroStat[];
};

export type AboutItem = {
    title: string;
    description: string;
};

export type AboutSection = {
    title: string;
    items: AboutItem[];
};

export type BigPictureItem = {
    question: string;
    answer: string;
};

export type BigPictureSection = {
    title: string;
    imageUrl: string;
    items: BigPictureItem[];
};

export type PersonalSection = {
    title: string;
    lead: string;
    description: string | null;
    imageUrls: string[];
};

// Each section is null until the home page is first saved with it.
export type HomePage = {
    id: number;
    heroSection: HeroSection | null;
    aboutSection: AboutSection | null;
    bigPictureSection: BigPictureSection | null;
    personalSection: PersonalSection | null;
};

const toImage = (imageUrl: string | null | undefined, title: string | undefined) =>
    imageUrl ? { src: new URL(imageUrl, apiUrl).href, title } : null;

// react-admin caches the record under the id the form asked for ("singleton"), so the record keeps that id
// rather than the API's.
const toRecord = (json: HomePage, id: Identifier): { data: any } => {
    const { heroSection: hero, aboutSection: about, bigPictureSection: bigPicture, personalSection: personal } = json;

    return {
        data: {
            id,
            heroSection: { ...hero, image: toImage(hero?.imageUrl, hero?.title) },
            // Spread so a never-saved (null) section becomes {}, which keeps the form's default rows.
            aboutSection: { ...about },
            bigPictureSection: { ...bigPicture, image: toImage(bigPicture?.imageUrl, bigPicture?.title) },
            personalSection: {
                ...personal,
                images: personal?.imageUrls.map((url) => ({ image: toImage(url, personal.title) })),
            },
        },
    };
};

export const homePageDataProvider: DataProvider = {
    ...defaultDataProvider,

    getOne: (_resource, { id, signal }) =>
        httpClient("/api/home-page", { signal }).then(({ json }) => toRecord(json, id)),

    // Images are only sent when a new file was picked; otherwise the API keeps the current one.
    // ASP.NET's form binding reads list items from numbered names like `heroSection.stats[0].label`.
    update: (
        _resource,
        {
            id,
            data: { heroSection: hero, aboutSection: about, bigPictureSection: bigPicture, personalSection: personal },
        },
    ) => {
        const body = new FormData();

        body.append("heroSection.title", hero.title);
        if (hero.description) body.append("heroSection.description", hero.description);
        if (hero.image?.rawFile) body.append("heroSection.image", hero.image.rawFile);

        hero.stats.forEach((stat: HeroStat, i: number) => {
            body.append(`heroSection.stats[${i}].label`, stat.label);
            body.append(`heroSection.stats[${i}].value`, stat.value);
        });

        body.append("aboutSection.title", about.title);

        about.items.forEach((item: AboutItem, i: number) => {
            body.append(`aboutSection.items[${i}].title`, item.title);
            body.append(`aboutSection.items[${i}].description`, item.description);
        });

        body.append("bigPictureSection.title", bigPicture.title);
        if (bigPicture.image?.rawFile) body.append("bigPictureSection.image", bigPicture.image.rawFile);

        bigPicture.items.forEach((item: BigPictureItem, i: number) => {
            body.append(`bigPictureSection.items[${i}].question`, item.question);
            body.append(`bigPictureSection.items[${i}].answer`, item.answer);
        });

        body.append("personalSection.title", personal.title);
        body.append("personalSection.lead", personal.lead);
        if (personal.description) body.append("personalSection.description", personal.description);

        personal.images.forEach(({ image }: { image: { rawFile?: File } | null }, i: number) => {
            if (image?.rawFile) body.append(`personalSection.images[${i}]`, image.rawFile);
        });

        return httpClient("/api/home-page", { method: "PUT", body }).then(({ json }) => toRecord(json, id));
    },
};

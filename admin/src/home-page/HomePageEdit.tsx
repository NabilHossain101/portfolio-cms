import { Typography } from "@mui/material";
import { Edit, SaveButton, TabbedForm, TabbedFormTabs, Toolbar } from "react-admin";
import { DiscardButton } from "../DiscardButton";
import { AboutInputs } from "./AboutInputs";
import { BigPictureInputs } from "./BigPictureInputs";
import type { AboutItem, BigPictureItem, HeroStat } from "./dataProvider";
import { HeroInputs } from "./HeroInputs";
import { PersonalInputs } from "./PersonalInputs";

// Placeholder sections, replaced one by one as their content is built.
const PLACEHOLDER_SECTIONS = ["Section 5", "Section 6"];

// The API requires exactly these list sizes and FixedFormIterator can't add rows, so the form starts with empty rows.
// react-admin merges the loaded record over these, item by item, so saved rows win and only missing ones stay empty.
const homePageDefaultValues = {
    heroSection: { stats: Array.from({ length: 4 }, (): HeroStat => ({ label: "", value: "" })) },
    aboutSection: { items: Array.from({ length: 6 }, (): AboutItem => ({ title: "", description: "" })) },
    bigPictureSection: { items: Array.from({ length: 6 }, (): BigPictureItem => ({ question: "", answer: "" })) },
    personalSection: { images: Array.from({ length: 6 }, () => ({ image: null })) },
};

// The id only identifies the record inside react-admin (it needs one to load it); the API resolves the singleton itself.
// Pessimistic mode waits for the API, so its validation errors reach the form.
// Hidden tabs stay mounted, so validation and Save cover every section.
export const HomePageEdit = () => (
    <Edit
        resource="home-page"
        id="singleton"
        redirect={false}
        mutationMode="pessimistic"
        title="Home page"
        sx={{ maxWidth: 800 }}
    >
        <TabbedForm
            defaultValues={homePageDefaultValues}
            tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}
            // On phones the toolbar is fixed to the bottom; SimpleForm leaves room for it, TabbedForm doesn't.
            sx={(theme) => ({ [theme.breakpoints.down("sm")]: { pb: "5em" } })}
            toolbar={
                <Toolbar sx={{ gap: 1 }}>
                    <SaveButton />
                    <DiscardButton />
                </Toolbar>
            }
        >
            <TabbedForm.Tab label="Hero">
                <HeroInputs />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="About">
                <AboutInputs />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Big Picture">
                <BigPictureInputs />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Personal">
                <PersonalInputs />
            </TabbedForm.Tab>
            {PLACEHOLDER_SECTIONS.map((label) => (
                <TabbedForm.Tab key={label} label={label}>
                    <Typography color="text.secondary">Coming soon.</Typography>
                </TabbedForm.Tab>
            ))}
        </TabbedForm>
    </Edit>
);

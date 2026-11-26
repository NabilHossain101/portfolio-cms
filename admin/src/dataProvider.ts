import { combineDataProviders } from "react-admin";
import { homePageDataProvider } from "./home-page/dataProvider";

// Each resource's data provider lives next to its screens (src/<feature>/dataProvider.ts).
export const dataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case "home-page":
            return homePageDataProvider;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});

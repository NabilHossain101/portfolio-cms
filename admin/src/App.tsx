import HomeIcon from "@mui/icons-material/Home";
import { Admin, localStorageStore, Resource, StoreContextProvider, useStore } from "react-admin";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./Dashboard";
import { HomePageEdit } from "./home-page/HomePageEdit";
import { Layout } from "./Layout";
import { themes } from "./themes/themes";

const store = localStorageStore(undefined, "PortfolioCmsAdmin");

// The home page is a singleton, so its "list" route is the edit form.
const AdminApp = () => {
    const [themeName] = useStore("themeName", themes[0].name);
    const theme = themes.find(({ name }) => name === themeName) ?? themes[0];

    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            store={store}
            layout={Layout}
            dashboard={Dashboard}
            lightTheme={theme.light}
            darkTheme={theme.dark}
        >
            <Resource name="home-page" list={HomePageEdit} options={{ label: "Home page" }} icon={HomeIcon} />
        </Admin>
    );
};

// The selected theme lives in react-admin's store, which <Admin> itself reads, so the store wraps it.
export const App = () => (
    <StoreContextProvider value={store}>
        <AdminApp />
    </StoreContextProvider>
);

import ArticleIcon from "@mui/icons-material/Article";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PersonIcon from "@mui/icons-material/Person";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { ListItemIcon, ListItemText, ListSubheader, MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import {
    AppBar,
    LayoutClasses,
    LoadingIndicator,
    Layout as RaLayout,
    Logout,
    Menu,
    UserMenu,
    useSidebarState,
    useUserMenu,
} from "react-admin";
import { ThemeSwapper } from "./themes/ThemeSwapper";

// Placeholder: closes the menu for now; point it at a profile page once auth exists.
const ProfileMenuItem = () => {
    const userMenu = useUserMenu();
    return (
        <MenuItem onClick={userMenu?.onClose}>
            <ListItemIcon>
                <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
        </MenuItem>
    );
};

const CmsAppBar = () => (
    <AppBar
        toolbar={
            <>
                <ThemeSwapper />
                <LoadingIndicator />
            </>
        }
        userMenu={
            <UserMenu>
                <ProfileMenuItem />
                <Logout />
            </UserMenu>
        }
    />
);

// react-admin has no menu-section component, so groups are MUI subheaders inside <Menu>. Custom children
// replace the automatic resource list: add a Menu.ResourceItem for each new resource. Add the
// "Resources" and "Layout" headings once those groups have items. Headings hide when the sidebar is collapsed.
const CmsMenu = () => {
    const [open] = useSidebarState();
    return (
        <Menu>
            <Menu.DashboardItem />
            <ListSubheader disableSticky hidden={!open}>
                Pages
            </ListSubheader>
            <Menu.ResourceItem name="home-page" />
            {/* DEMO items for reviewing the menu UI: the routes don't exist yet. Remove before shipping. */}
            <Menu.Item to="/demo/about-page" primaryText="About page" leftIcon={<InfoIcon />} />
            <Menu.Item to="/demo/contact-page" primaryText="Contact page" leftIcon={<CallIcon />} />
            <ListSubheader disableSticky hidden={!open}>
                Resources
            </ListSubheader>
            <Menu.Item to="/demo/media" primaryText="Media" leftIcon={<PermMediaIcon />} />
            <Menu.Item to="/demo/posts" primaryText="Posts" leftIcon={<ArticleIcon />} />
            <ListSubheader disableSticky hidden={!open}>
                Layout
            </ListSubheader>
            <Menu.Item to="/demo/header" primaryText="Header" leftIcon={<WebAssetIcon />} />
            <Menu.Item to="/demo/navigation" primaryText="Navigation" leftIcon={<ViewStreamIcon />} />
            <Menu.Item to="/demo/footer" primaryText="Footer" leftIcon={<ViewDayIcon />} />
            {/* END DEMO */}
        </Menu>
    );
};

// react-admin sizes the layout to its content (min-width: fit-content), so wide content such as the
// edit form's tab bar widens the page on phones; min-width 0 keeps the page at screen width and lets
// the tabs scroll instead.
export const Layout = ({ children }: { children: ReactNode }) => (
    <RaLayout appBar={CmsAppBar} menu={CmsMenu} sx={{ minWidth: 0, [`& .${LayoutClasses.content}`]: { minWidth: 0 } }}>
        {children}
    </RaLayout>
);

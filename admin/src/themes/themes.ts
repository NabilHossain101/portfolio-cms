import {
    bwDarkTheme,
    bwLightTheme,
    defaultDarkTheme,
    defaultLightTheme,
    houseDarkTheme,
    houseLightTheme,
    type RaThemeOptions,
} from "react-admin";

export type Theme = { name: string; light: RaThemeOptions; dark: RaThemeOptions };

export const themes: Theme[] = [
    { name: "Default", light: defaultLightTheme, dark: defaultDarkTheme },
    { name: "House", light: houseLightTheme, dark: houseDarkTheme },
    { name: "B&W", light: bwLightTheme, dark: bwDarkTheme },
];

import ColorLensIcon from "@mui/icons-material/ColorLens";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { ToggleThemeButton, useStore } from "react-admin";
import { themes } from "./themes";

// Same pattern as the react-admin demo: pick a theme family, then toggle its light/dark variant.
export const ThemeSwapper = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [themeName, setThemeName] = useStore("themeName", themes[0].name);
    const current = themes.find(({ name }) => name === themeName) ?? themes[0];

    return (
        <>
            <Tooltip title="Change theme" enterDelay={300}>
                <IconButton
                    color="inherit"
                    aria-label="Change theme"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <ColorLensIcon />
                </IconButton>
            </Tooltip>
            <ToggleThemeButton />
            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                {themes.map(({ name }) => (
                    <MenuItem
                        key={name}
                        selected={name === current.name}
                        onClick={() => {
                            setThemeName(name);
                            setAnchorEl(null);
                        }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

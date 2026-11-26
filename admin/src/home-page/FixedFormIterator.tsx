import type { Theme } from "@mui/material/styles";
import { SimpleFormIterator, SimpleFormIteratorClasses, type SimpleFormIteratorProps } from "react-admin";

// For the home page's fixed-size lists (the API requires the exact count; the form starts them with empty rows):
// rows can't be added, removed or reordered, and each row shows its position number, which is its order on the website.
export const FixedFormIterator = (props: FixedFormIteratorProps) => (
    <SimpleFormIterator
        {...props}
        getItemLabel={(index) => `${index + 1}`}
        disableAdd
        disableRemove
        disableClear
        disableReordering
        sx={styles}
    />
);

export type FixedFormIteratorProps = SimpleFormIteratorProps;

// A small muted number beside each row, at every width (react-admin hides it below md),
// vertically centred on the first input's text, which sits lower in filled inputs than in outlined ones.
const styles = (theme: Theme) => ({
    [`& .${SimpleFormIteratorClasses.line}`]: { display: "flex" },
    [`& .${SimpleFormIteratorClasses.index}`]: {
        display: "flex",
        minWidth: "1.5em",
        justifyContent: "flex-end",
        mt: theme.components?.MuiTextField?.defaultProps?.variant === "filled" ? 3.5 : 2.25,
        color: "text.secondary",
    },
    [theme.breakpoints.down("sm")]: { [`& .${SimpleFormIteratorClasses.form}`]: { flex: 1 } },
});

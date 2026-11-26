import type { Theme } from "@mui/material/styles";
import { ArrayInput, maxLength, required, SimpleFormIteratorClasses, TextInput } from "react-admin";
import { ImagePicker } from "../ImagePicker";
import { FixedFormIterator } from "./FixedFormIterator";

export const PersonalInputs = () => (
    <>
        <TextInput source="personalSection.title" label="Title" validate={[required(), maxLength(200)]} />
        <TextInput
            source="personalSection.lead"
            label="Lead"
            helperText="Bold paragraph under the title."
            multiline
            minRows={2}
            validate={[required(), maxLength(300)]}
        />
        <TextInput
            source="personalSection.description"
            label="Description"
            multiline
            minRows={4}
            validate={maxLength(1500)}
        />
        <ArrayInput
            source="personalSection.images"
            label="Images"
            // Marks the label as required; the list always has its 6 rows, each validated on its own.
            validate={required()}
            helperText="Two strips beside the text: 1–3 on the left, 4–6 on the right. JPG, PNG, WebP or GIF, up to 10 MB each."
            sx={imageGrid}
        >
            <FixedFormIterator fullWidth>
                <ImagePicker
                    source="image"
                    label={false}
                    helperText={false}
                    inputProps={{ "aria-label": "Image" }}
                    validate={required()}
                />
            </FixedFormIterator>
        </ArrayInput>
    </>
);

// Column-major 2×3 grid on wider screens, so the left column is images 1–3 and the right 4–6, like the website.
// Rows get the vertical room that text inputs' helper lines give other lists.
const imageGrid = (theme: Theme) => ({
    [`& .${SimpleFormIteratorClasses.line}`]: { py: 1.5 },
    [theme.breakpoints.up("md")]: {
        [`& .${SimpleFormIteratorClasses.list}`]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gridTemplateRows: "repeat(3, auto)",
            gridAutoFlow: "column",
            columnGap: 2,
        },
        // The iterator drops the divider only under the last row (image 6); image 3 ends the left column too.
        [`& .${SimpleFormIteratorClasses.line}:nth-of-type(3)`]: { borderBottom: "none" },
    },
});

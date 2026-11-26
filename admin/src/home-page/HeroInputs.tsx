import { ArrayInput, maxLength, required, TextInput } from "react-admin";
import { ImagePicker } from "../ImagePicker";
import { FixedFormIterator } from "./FixedFormIterator";

export const HeroInputs = () => (
    <>
        <TextInput source="heroSection.title" label="Title" validate={[required(), maxLength(200)]} />
        <TextInput
            source="heroSection.description"
            label="Description"
            multiline
            minRows={3}
            validate={maxLength(1000)}
        />
        <ImagePicker
            source="heroSection.image"
            label="Image"
            validate={required()}
            helperText="Right side of the section. JPG, PNG, WebP or GIF, up to 10 MB."
        />
        <ArrayInput source="heroSection.stats" label="Stats">
            <FixedFormIterator inline>
                <TextInput source="value" label="Value" validate={[required(), maxLength(20)]} />
                <TextInput source="label" label="Label" validate={[required(), maxLength(100)]} />
            </FixedFormIterator>
        </ArrayInput>
    </>
);

import { ArrayInput, maxLength, required, TextInput } from "react-admin";
import { ImagePicker } from "../ImagePicker";
import { FixedFormIterator } from "./FixedFormIterator";

export const BigPictureInputs = () => (
    <>
        <TextInput source="bigPictureSection.title" label="Title" validate={[required(), maxLength(200)]} />
        <ImagePicker
            source="bigPictureSection.image"
            label="Image"
            validate={required()}
            helperText="Top right of the section. JPG, PNG, WebP or GIF, up to 10 MB."
        />
        <ArrayInput source="bigPictureSection.items" label="Questions">
            <FixedFormIterator inline>
                <TextInput source="question" label="Question" validate={[required(), maxLength(100)]} />
                <TextInput source="answer" label="Answer" validate={[required(), maxLength(200)]} />
            </FixedFormIterator>
        </ArrayInput>
    </>
);

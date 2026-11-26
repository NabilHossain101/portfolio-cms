import { ArrayInput, maxLength, required, TextInput } from "react-admin";
import { FixedFormIterator } from "./FixedFormIterator";

export const AboutInputs = () => (
    <>
        <TextInput source="aboutSection.title" label="Title" validate={[required(), maxLength(200)]} />
        <ArrayInput source="aboutSection.items" label="Grid">
            <FixedFormIterator>
                <TextInput source="title" label="Title" validate={[required(), maxLength(100)]} />
                <TextInput
                    source="description"
                    label="Description"
                    multiline
                    minRows={2}
                    validate={[required(), maxLength(500)]}
                />
            </FixedFormIterator>
        </ArrayInput>
    </>
);

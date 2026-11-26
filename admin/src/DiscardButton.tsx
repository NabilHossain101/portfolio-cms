import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "react-admin";

// Discards unsaved changes by resetting the form to the last loaded/saved record.
// Sized to match SaveButton.
export const DiscardButton = () => {
    const { reset } = useFormContext();
    const { isDirty } = useFormState();
    return <Button label="Discard" size="medium" onClick={() => reset()} disabled={!isDirty} />;
};

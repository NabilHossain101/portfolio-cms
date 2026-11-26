import { useFormContext, useWatch } from "react-hook-form";
import {
    FileInputClasses,
    ImageField,
    ImageFieldClasses,
    ImageInput,
    useNotify,
    useWrappedSource,
    type ImageInputProps,
} from "react-admin";

// ImageInput with a fixed 16:9 preview.
export const ImagePicker = ({ options, ...props }: Omit<ImageInputProps, "children">) => {
    const { setValue } = useFormContext();
    const notify = useNotify();
    // The full path, also inside ArrayInput rows.
    const source = useWrappedSource(props.source);
    // The value before a drop: ImageInput clears the field when every dropped file is rejected (wrong type or too big).
    const current = useWatch({ name: source });

    return (
        <ImageInput
            // Same types and size limit as the API (ImageFileAttribute), so bad files are rejected on drop, not on save.
            accept={{ "image/jpeg": [], "image/png": [], "image/webp": [], "image/gif": [] }}
            maxSize={10 * 1024 * 1024}
            helperText="JPG, PNG, WebP or GIF, up to 10 MB."
            labelSingle="Drop or select an image."
            options={{
                ...options,
                onDrop: (accepted, rejected, event) => {
                    if (accepted.length === 0 && rejected.length > 0) {
                        setValue(source, current, { shouldDirty: true });
                        notify("Choose a JPG, PNG, WebP or GIF image up to 10 MB.", { type: "warning" });
                    }
                    options?.onDrop?.(accepted, rejected, event);
                },
            }}
            sx={{
                [`& .${FileInputClasses.dropZone}`]: {
                    border: 1,
                    borderStyle: "dashed",
                    borderColor: "text.disabled",
                    py: 2,
                    "& p": { m: 0 },
                },
                // Always visible (react-admin only shows it on hover) and readable on any image.
                [`& .${FileInputClasses.removeButton} button`]: {
                    opacity: 1,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.paper" },
                },
            }}
            {...props}
        >
            <ImageField
                source="src"
                title="title"
                sx={{
                    [`& .${ImageFieldClasses.image}`]: {
                        // Fixed 16:9 frame so portrait and landscape uploads preview the same size, uncropped.
                        width: 480,
                        maxWidth: "100%",
                        aspectRatio: "16 / 9",
                        height: "auto",
                        objectFit: "contain",
                        bgcolor: "action.hover",
                        borderRadius: 1,
                    },
                }}
            />
        </ImageInput>
    );
};

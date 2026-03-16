import { Control, Controller, FieldPath } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import * as z from "zod";
import { formSchema } from "@/lib/utils";
import React from "react";

const form = formSchema("sign-up");

interface CustomInputProps {
    control: Control<z.infer<typeof form>>;
    label: string;
    name: FieldPath<z.infer<typeof form>>;
    id: string;
}

export default function CustomInput({
    control,
    label,
    name,
    id,
    ...restProps
}: CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <Input
                        {...field}
                        id={id}
                        aria-invalid={fieldState.invalid}
                        {...restProps}
                    />
                    {fieldState.invalid && (
                        <FieldError
                            className="form-message"
                            errors={[fieldState.error]}
                        />
                    )}
                </Field>
            )}
        />
    );
}

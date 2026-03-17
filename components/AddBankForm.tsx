"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function AddBankForm() {
    const { addBank } = useFinance();
    const form = z.object({
        name: z
            .string()
            .trim()
            .min(2, "At least 2 characters.")
            .max(20, "Maximum 20 characters"),
        balance: z
            .string()
            .trim()
            .refine((num) => !isNaN(Number(num)) && Number(num) > 0, {
                message: "Balance must be a number and greater than 0",
            }),

        digit: z
            .string()
            .length(4, "Please enter the last 4 digits of your bank account."),
    });

    // useForm hook - create form instance
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<z.infer<typeof form>>({
        resolver: zodResolver(form), // Zod resolver - validate the form data.
        defaultValues: {
            name: "",
            balance: "",
            digit: "",
        },
    });

    // Data is validated and form is submitted
    async function onSubmit(data: z.infer<typeof form>) {
        // Do something with the form values.
        try {
            const processedData = {
                name: data.name,
                digit: data.digit,
                balance: parseInt(data.balance),
            };

            await addBank(processedData);
        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-3">
                <DialogTitle className="text-xl">
                    Add New Bank Account
                </DialogTitle>
            </DialogHeader>
            <FieldGroup className="gap-3 mb-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="bank-name">
                                Name of Bank Account
                            </FieldLabel>
                            <Input
                                {...field}
                                id="bank-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ex: AK Bank"
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
                <Controller
                    name="digit"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="digit">
                                The last 4 digits of your card number
                            </FieldLabel>
                            <Input
                                {...field}
                                id="digit"
                                aria-invalid={fieldState.invalid}
                                type="text"
                                placeholder="Ex: 1111"
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
                <Controller
                    name="balance"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="balance">
                                Balance (VND)
                            </FieldLabel>
                            <Input
                                {...field}
                                id="balance"
                                aria-invalid={fieldState.invalid}
                                type="text"
                                placeholder="Ex: 100000"
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
            </FieldGroup>

            <DialogFooter className="border-none bg-gray-100">
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="border-gray-300 bg-white cursor-pointer"
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    className="text-base rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form hover:scale-110 cursor-pointer flex"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            &nbsp; Adding...
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>
            </DialogFooter>
        </form>
    );
}

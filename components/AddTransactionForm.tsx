"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

import {
    DialogClose,
    DialogDescription,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants";

export default function AddTransactionForm() {
    const { banks, addTransaction } = useFinance();
    const form = z.object({
        name: z.string().trim().min(2, "At least 2 characters."),
        amount: z
            .string()
            .trim()
            .refine((num) => !isNaN(Number(num)) && Number(num) !== 0, {
                message: "Amount must be a number and not 0",
            }),
        // .string()
        // .trim()
        // .transform((val) => Number(val))
        // .refine((num) => !Number.isNaN(num) && num !== 0, {
        //     error: "Amount must be a number and not 0",
        // }),
        category: z.string().min(1, "Please select a category."),
        bank: z.string().min(1, "Please select a bank."),
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
            amount: "",
            category: "",
            bank: "",
        },
    });

    // Data is validated and form is submitted
    async function onSubmit(data: z.infer<typeof form>) {
        // Do something with the form values.
        try {
            const processedData = {
                note: data.name,
                amount: parseInt(data.amount),
                type:
                    parseInt(data.amount) > 0
                        ? "INCOME"
                        : ("EXPENSE" as "INCOME" | "EXPENSE"),
                category: data.category as
                    | "Food"
                    | "Transport"
                    | "Salary"
                    | "Shopping"
                    | "Other",
                bankId: data.bank,
            };

            await addTransaction(processedData);
        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-3">
                <DialogTitle className="text-xl">
                    Add New Transaction
                </DialogTitle>
                <DialogDescription>
                    Add a new transaction here. <b>All field are required</b>.
                    Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <FieldGroup className="gap-3">
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="transaction-name">
                                Name of Transaction
                            </FieldLabel>
                            <Input
                                {...field}
                                id="transaction-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ex: Lunch"
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
                    name="amount"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="amount">
                                Amount (VND)
                            </FieldLabel>
                            <Input
                                {...field}
                                id="amount"
                                aria-invalid={fieldState.invalid}
                                type="text"
                                placeholder="Ex: -100000"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="form-message"
                                    errors={[fieldState.error]}
                                />
                            )}
                            <p className="italic text-gray-500">
                                INCOME - positive (+) <br /> EXPENSE - negative
                                (-)
                            </p>
                        </Field>
                    )}
                />

                <div className="flex flex-col sm:flex-row gap-2">
                    <Controller
                        name="category"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Category</FieldLabel>

                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                        className="aria-invalid:ring-red-300"
                                    >
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {categories.map((cate) => (
                                            <SelectItem
                                                className="hover:bg-gray-100"
                                                value={cate}
                                                key={cate}
                                            >
                                                {cate}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="form-message"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        name="bank"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Bank Accounts</FieldLabel>

                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                        className="aria-invalid:ring-red-300"
                                    >
                                        <SelectValue placeholder="Select an account" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {banks.map((bank) => (
                                            <SelectItem
                                                className="hover:bg-gray-100"
                                                value={bank.id}
                                                key={bank.name}
                                            >
                                                {bank.name} (** {bank.digit})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="form-message"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Select>
                                <DialogClose asChild>
                                    <Link
                                        href="/my-banks"
                                        className="hover:underline mb-2.5"
                                    >
                                        + Add a new bank account
                                    </Link>
                                </DialogClose>
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>

            <DialogFooter className="border-none bg-gray-100">
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="border-gray-300 bg-white"
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

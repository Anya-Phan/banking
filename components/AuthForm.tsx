"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { formSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { FieldGroup } from "@/components/ui/field";
import { signIn, signUp } from "@/lib/actions/users.actions";
import { useRouter } from "next/navigation";
import { signUpWithGoogle } from "@/lib/actions/oauth.actions";

export default function AuthForm({ type }: AuthFormProps) {
    const [user, setUser] = useState(null);
    const form = formSchema(type);
    const router = useRouter();
    // useForm hook - create form instance
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<z.infer<typeof form>>({
        resolver: zodResolver(form), // Zod resolver - validate the form data.
        defaultValues: {
            email: "",
            password: "",
            dateOfBirth: "2000-01-01",
            firstName: "",
            lastName: "",
            address: "",
        },
    });

    // Data is validated and form is submitted
    async function onSubmit(data: z.infer<typeof form>) {
        // Do something with the form values.
        try {
            // Sign up with Appwrite & create plaid token
            if (type === "sign-up") {
                const newUser = await signUp({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName ,
                    lastName: data.lastName
                });
                setUser(newUser);
                router.push("/account");
            }

            if (type === "sign-in") {
                const user = await signIn({
                    email: data.email,
                    password: data.password,
                });
                if (user) {
                    router.push("/");
                    // redirect("../") only in Server Components, Route Handlers, and Server Functions.
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            // console.log(data);
        }
    }

    return (
        <section className="auth-form ">
            <header>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={30}
                        height={30}
                    />
                    <h2 className="text-xl lg:text-2xl font-semibold">
                        AKBank
                    </h2>
                </Link>
                <h1 className="text-4xl font-bold my-2.5">
                    {user
                        ? "Link Account"
                        : type === "sign-in"
                          ? "Sign In"
                          : "Sign Up"}
                </h1>
                <p className="text-14 font-light my-2.5 italic">
                    {user
                        ? "Link your account to get started"
                        : "Please fill the form below if you already have account"}
                </p>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
            ) : (
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FieldGroup>
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-3">
                                        <CustomInput
                                            control={control}
                                            label="First Name"
                                            name="firstName"
                                            id="form-firstname"
                                            placeholder="ex: John"
                                            type="text"
                                        />
                                        <CustomInput
                                            control={control}
                                            label="Last Name"
                                            name="lastName"
                                            id="form-lastname"
                                            placeholder="ex: John"
                                            type="text"
                                        />
                                    </div>
                                    <CustomInput
                                        control={control}
                                        label="Date Of Birth"
                                        name="dateOfBirth"
                                        id="form-birth"
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                    />
                                    <CustomInput
                                        control={control}
                                        label="Address"
                                        name="address"
                                        id="form-birth"
                                        type="text"
                                        placeholder="524 Lalaland, NYC"
                                    />
                                </>
                            )}

                            <CustomInput
                                control={control}
                                label="Email"
                                name="email"
                                placeholder="Enter your email"
                                id="form-email"
                                type="text"
                            />
                            <CustomInput
                                control={control}
                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                id="form-password"
                                type="password"
                            />
                        </FieldGroup>
                        <Button
                            type="submit"
                            className="form-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    &nbsp; Submitting...
                                </>
                            ) : type === "sign-in" ? (
                                "Sign In"
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>
                </div>
            )}
            {!user && (
                <footer className="flex flex-col items-center gap-2">
                    <div className="flex justify-center gap-1">
                        <p>
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        {type === "sign-in" ? (
                            <Link href="/sign-up" className="form-link">
                                Sign Up
                            </Link>
                        ) : (
                            <Link href="/sign-in" className="form-link">
                                Sign In
                            </Link>
                        )}
                    </div>

                    <div className="text-gray-400 italic">or</div>

                    <form action={signUpWithGoogle}>
                        <Button
                            variant="outline"
                            type="submit"
                            className="cursor-pointer"
                        >
                            <Image
                                src="/icons/google.svg"
                                width={20}
                                height={20}
                                alt="google"
                            />{" "}
                            Sign up with Google{" "}
                        </Button>
                    </form>
                </footer>
            )}
        </section>
    );
}

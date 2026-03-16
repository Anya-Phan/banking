"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";

import AddTransactionForm from "./AddTransactionForm";
export default function NewTransaction() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="sidebar-link group w-full hover:bg-bank-gradient hover:text-white text-black-2 text-base font-semibold cursor-pointer">
                    <Image
                        src="/icons/plus.svg"
                        alt="plus"
                        width={20}
                        height={20}
                        className="transition group-hover:invert group-hover:brightness-0"
                    />

                    <p className="transition group-hover:text-white">
                        New Transaction
                    </p>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white max-h-screen overflow-auto ring-gray-300">
                <AddTransactionForm />
            </DialogContent>
        </Dialog>
    );
}

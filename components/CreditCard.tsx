"use client";
import Image from "next/image";
import ShowBalanceToggle from "./ShowBalanceToggle";
import { useState } from "react";
import { formatAmount } from "@/lib/utils";
import { useFinance } from "@/context/FinanceContext";
import DeleteBtn from "./DeleteBtn";

export default function CreditCard({
    digit,
    currentBalance,
    userName = "Guest",
    hasDeleteButton,
    imgURL,
    bankName,
    bankId,
}: CreditCardProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const { deleteBank } = useFinance();
    const bgVariants = {
        firstBg: "bg-[url(/images/bg-credit-card-1.png)]",
        secondBg: "bg-[url(/images/bg-credit-card-2.png)]",
    };
    const className = `bg-cover flex flex-col ${bgVariants[imgURL]} rounded-2xl p-3 text-white absolute inset-0`;

    function onCheckEye() {
        setVisible(!visible);
    }
    function handleDeleteBank(bankId: string) {
        deleteBank(bankId);
    }

    return (
        <div className="relative w-full pb-[62.5%]">
            <div className={className}>
                <div className="flex items-center">
                    <p className="font-black opacity-30">{bankName}</p>
                    <Image
                        src={"/icons/visa.svg"}
                        width={200}
                        height={200}
                        alt="Credit Card"
                        style={{
                            objectFit: "contain",
                            width: "50px",
                            height: "auto",
                            marginLeft: "auto",
                        }}
                    />
                </div>

                <div className="text-md flex gap-3">
                    {visible ? (
                        <p>{formatAmount(currentBalance)} VND</p>
                    ) : (
                        <p>●●●● VND</p>
                    )}
                    <ShowBalanceToggle
                        isShow={visible}
                        onCheckEye={onCheckEye}
                    />
                </div>

                <p className="text-lg my-2">●●●● ●●●● ●●●● {digit}</p>
                <div className="mt-auto flex gap-5">
                    <div>
                        <p className="text-10 font-extralight">CARD HOLDER</p>
                        <p className="text-12 font-medium">{userName}</p>
                    </div>
                    <div>
                        <p className="text-10 font-extralight">VALID THRU</p>
                        <p className="text-12 font-medium">●●/●●</p>
                    </div>
                    {hasDeleteButton && (
                        <DeleteBtn
                            id={bankId}
                            deleteFunc={deleteBank}
                            type="delete-bank"
                            subtitle="This will also delete ALL the transactions of this bank account. Are you sure?"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

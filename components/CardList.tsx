"use client";
import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import CreditCard from "./CreditCard";
import NewCard from "./NewCard";

export default function CardList({ user }: { user: User }) {
    const { banks } = useFinance();
    const sortedbanks = useMemo(() => {
        return [...banks].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );
    }, [banks]);


    return (
        <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-1 min-[52rem]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {sortedbanks.map((bank, index) => {
                return (
                    <CreditCard
                        key={bank.name}
                        userName={user.name}
                        imgURL={index % 2 !== 0 ? "firstBg" : "secondBg"}
                        digit={bank.digit}
                        currentBalance={bank.balance}
                        bankName={bank.name}
                        hasDeleteButton={true}
                        bankId={bank.id}
                    />
                );
            })}
            <NewCard />
        </div>
    );
}

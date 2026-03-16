"use client";

import Link from "next/link";
import CreditCard from "./CreditCard";
import { Button } from "./ui/button";
import { useFinance } from "@/context/FinanceContext";

export default function RightSidebar({
    user,
}: RightSidebarProps) {
    const {banks} = useFinance()
    return (
        <section className="right-sidebar">
            <div className="flex flex-col pb-8">
                <div className="profile-banner" />
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">
                            {user.name[0]}
                        </span>
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>
                <div className="p-6 mt-0">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-medium">My cards</h3>
                        <Button
                            size="xs"
                            variant="outline"
                            className="hover:bg-gray-200 border-gray-300"
                        >
                            <Link href="/my-banks">+ Add cars</Link>
                            
                        </Button>
                    </div>
                    <div className="bank-cards">
                        {banks[0] && (
                            <div className="bank-card-0">
                                <CreditCard
                                    currentBalance={banks[0].balance}
                                    userName={user.name}
                                    imgURL="secondBg"
                                    bankName={banks[0].name}
                                    hasDeleteButton={false}
                                    digit={banks[0].digit}
                                    bankId={banks[0].id}
                                />
                            </div>
                        )}
                        {banks[1] && (
                            <div className="bank-card-1">
                                <CreditCard
                                    userName={user.name}
                                    imgURL="firstBg"
                                    currentBalance={banks[1].balance}
                                    bankName={banks[1].name}
                                    hasDeleteButton={false}
                                    digit={banks[1].digit}
                                    bankId={banks[1].id}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import CreditCard from "./CreditCard";
import { Button } from "./ui/button";

export default function RightSidebar({
    user,
    transactions,
    banks,
}: RightSidebarProps) {
    return (
        <section className="right-sidebar">
            <div className="flex flex-col pb-8">
                <div className="profile-banner" />
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">
                            A
                        </span>
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-name">
                            user.firstName user.lastName
                        </h2>
                        <p className="profile-email">user.email</p>
                    </div>
                </div>
                <div className="p-6 mt-0">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-medium">My cards</h3>
                        <Button size="xs" variant="outline" className="hover:bg-gray-200 border-gray-300">
                            + Add cars
                        </Button>
                    </div>
                    <div className="bank-cards">
                        {banks[0] && (
                            <div className="bank-card-0">
                                <CreditCard imgURL="secondBg" />
                            </div>
                        )}
                        {banks[1] && (
                            <div className="bank-card-1">
                                <CreditCard imgURL="firstBg" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

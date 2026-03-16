"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import Footer from "./Footer";
import NewTransaction from "./NewTransaction";

export default function Sidebar({ user }: SiderbarProps) {
    const pathname = usePathname();
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 mb-12 cursor-pointer"
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="ABank logo"
                        width={24}
                        height={24}
                        className="size-10 lg:size-12"
                    />
                    <h1 className="sidebar-logo">AKBank</h1>
                </Link>
                {sidebarLinks.map((item) => {
                    const isActive = item.route === pathname ? true : false;
                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={`sidebar-link${isActive ? " bg-bank-gradient" : ""}`}
                        >
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "white-filter" : ""}`}
                            />
                            <div className={`sidebar-label ${isActive ? " white-filter" : ""}`}>{item.label}</div>
                        </Link>
                    );
                })}
                <NewTransaction/>
            </nav>
            <Footer user={user}/>
        </section>
    );
}

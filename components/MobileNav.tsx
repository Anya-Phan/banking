"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({ user }: MobileNavProps) {
    const pathname = usePathname();
    return (
        <div className="md:hidden flex items-center justify-between p-1.5 md:-z-10">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="bg-white border-none">
                    <SheetHeader>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="flex items-center gap-2.5 mb-5 cursor-pointer"
                            >
                                <Image
                                    src="/icons/logo.svg"
                                    alt="ABank logo"
                                    width={24}
                                    height={24}
                                    className="size-10 lg:size-12"
                                />
                                <SheetTitle className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1">
                                    AKBank
                                </SheetTitle>
                            </Link>
                            {sidebarLinks.map((item) => {
                                const isActive =
                                    item.route === pathname ? true : false;
                                return (
                                    <Link
                                        href={item.route}
                                        key={item.label}
                                        className={`flex gap-3 items-center p-2.5 2xl:p-4 rounded-lg xl:justify-start${isActive ? " bg-bank-gradient" : ""}`}
                                    >
                                        <Image
                                            src={item.imgURL}
                                            alt={item.label}
                                            width={20}
                                            height={20}
                                            className={`${isActive ? "white-filter" : ""}`}
                                        />
                                        <div
                                            className={`${isActive ? " white-filter" : ""}`}
                                        >
                                            {item.label}
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
                <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                />
                <h1 className="text-16 font-bold">AKBank</h1>
            </div>
            <div></div>
        </div>
    );
}

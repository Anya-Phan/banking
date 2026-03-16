import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/users.actions";
import { redirect } from "next/navigation";
import { FinanceProvider } from "@/context/FinanceContext";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) redirect("/sign-in");
    const user = {
        name: loggedUser.name,
        email: loggedUser.email,
    } as User
    return (
        <main className="flex flex-col h-screen w-full font-inter md:flex-row">
            <FinanceProvider>
                <MobileNav user={user}></MobileNav>
                <Sidebar user={user}></Sidebar>
                <div className="grow">{children}</div>
            </FinanceProvider>
        </main>
    );
}

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
        <main className="flex flex-col h-screen w-full font-inter md:flex-row">
            <MobileNav></MobileNav>
            <Sidebar></Sidebar>
            <>{children}</>
        </main>
    );
}

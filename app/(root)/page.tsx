import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/users.actions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { RecentTransactions } from "@/components/RecentTransactions";

export default async function Home() {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) {
        redirect("/sign-in");
    }

    const user = {
        name: loggedUser.name,
        email: loggedUser.email,
    } as User
    

    const banks = await prisma.bank.findMany({
        where: { userId: loggedUser.$id },
    });

    const totalCurrentBalance = banks.reduce((acc, bank) => {
        return acc + bank.balance;
    }, 0);

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={user?.name || "Guest"}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox
                        totalBanks={banks.length}
                        totalCurrentBalance={totalCurrentBalance}
                        banks={banks}
                    />
                </header>
                <div>
                    <RecentTransactions />
                </div>
            </div>
            <RightSidebar user={user}  />
        </section>
    );
}

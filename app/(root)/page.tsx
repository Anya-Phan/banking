import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
    return <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox type="greeting" title="Welcome" user="Guest" subtext="Access and manage your account"/>
                <TotalBalanceBox totalBanks={1} totalCurrentBalance={1234.56} accounts={[]}/>
            </header>
        </div>
        <RightSidebar transactions={[]} banks={[{},{}]}/>
    </section>
}
"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TransactionTable } from "./TransactionTable";
import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import NoData from "./NoData";
import { BarChart } from "./BarChart";
export function RecentTransactions() {
    const { transactions, banks } = useFinance();

    const bankMap = useMemo(() => {
        const map: Record<string, string> = {};
        banks.forEach((bank) => {
            map[bank.id] = bank.name;
        });
        return map;
    }, [banks]);

    const sortedTransactions = useMemo(() => {
        return [...transactions].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );
    }, [transactions]);

    const incomeTrans = sortedTransactions.filter(
        (transaction) => transaction.type === "INCOME",
    );
    const expenseTrans = sortedTransactions.filter(
        (transaction) => transaction.type === "EXPENSE",
    );

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent transaction
                </h2>
                <Link href="/transaction-history" className="view-all-btn">
                    View All
                </Link>
            </header>
            <div className="rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6 mx-auto w-full max-w-100">
                <p className="text-lg mb-6 text-center">
                    EXPENSE by <span className="font-semibold">Category</span>
                </p>
                <BarChart transactions={transactions} />
            </div>
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mx-auto bg-blue-100 text-gray-600 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    {sortedTransactions.length ? (
                        <TransactionTable
                            transactions={sortedTransactions}
                            bankMap={bankMap}
                        />
                    ) : (
                        <NoData title="transactions"></NoData>
                    )}

                    <Suspense
                        fallback={
                            <>
                                <Loader2 className="animate-spin" />
                                Loading...
                            </>
                        }
                    ></Suspense>
                </TabsContent>
                <TabsContent value="income">
                    {incomeTrans.length ? (
                        <TransactionTable
                            transactions={incomeTrans}
                            bankMap={bankMap}
                        />
                    ) : (
                        <NoData title="income transactions"></NoData>
                    )}
                </TabsContent>
                <TabsContent value="expense">
                    {expenseTrans.length ? (
                        <TransactionTable
                            transactions={expenseTrans}
                            bankMap={bankMap}
                        />
                    ) : (
                        <NoData title="expense transactions"></NoData>
                    )}
                </TabsContent>
            </Tabs>
        </section>
    );
}

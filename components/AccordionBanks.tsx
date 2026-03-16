"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useFinance } from "@/context/FinanceContext";
import { TransactionTable } from "./TransactionTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useMemo } from "react";
import NoData from "./NoData";
export function AccordionBanks() {
    const { banks, transactions } = useFinance();

    const sortedTransactions = useMemo(() => {
        return [...transactions].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );
    }, [transactions]);

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className="max-w-4xl"
        >
            {banks.map((bank) => {
                const targetTransactions = sortedTransactions.filter(
                    (transaction) => transaction.bankId === bank.id,
                );
                const incomeTrans = targetTransactions.filter(
                    (transaction) => transaction.type === "INCOME",
                );
                const expenseTrans = targetTransactions.filter(
                    (transaction) => transaction.type === "EXPENSE",
                );
                return (
                    <AccordionItem value={bank.name} key={bank.name}>
                        <AccordionTrigger className="text-14 lg:text-2xl">
                            {bank.name}
                        </AccordionTrigger>
                        <AccordionContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="mx-auto bg-blue-100 text-gray-600 mb-4">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="income">
                                        Income
                                    </TabsTrigger>
                                    <TabsTrigger value="expense">
                                        Expense
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    {targetTransactions.length ? (
                                        <TransactionTable
                                            transactions={targetTransactions}
                                        />
                                    ) : (
                                        <NoData title="transactions"></NoData>
                                    )}
                                </TabsContent>
                                <TabsContent value="income">
                                    {incomeTrans.length ? (
                                        <TransactionTable
                                            transactions={incomeTrans}
                                        />
                                    ) : (
                                        <NoData title="income transactions"></NoData>
                                    )}
                                </TabsContent>
                                <TabsContent value="expense">
                                    {expenseTrans.length ? (
                                        <TransactionTable
                                            transactions={expenseTrans}
                                        />
                                    ) : (
                                        <NoData title="expense transactions"></NoData>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

"use client";

import { getLoggedInUser } from "@/lib/actions/users.actions";
import { useRouter } from "next/navigation";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface FinanceContextType {
    transactions: Transaction[];
    banks: Bank[];

    addTransaction: (
        data: Omit<Transaction, "id" | "userId" | "createdAt">,
    ) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;

    addBank: (
        data: Omit<Bank, "id" | "userId" | "createdAt" | "transactions">,
    ) => Promise<void>;
    deleteBank: (id: string) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [banks, setBanks] = useState<Bank[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const loggedUser = await getLoggedInUser();

            fetch(`/api/transactions/${loggedUser?.$id}`)
                .then((res) => res.json())
                .then(setTransactions)
                .catch((error) =>
                    console.error("Getting all transactions: fail"),
                );

            // fetch(`/api/banks?userId=${loggedUser?.$id}`)
            //     .then((res) => res.json())
            //     .then(setBanks);
            fetch("/api/banks")
                .then((res) => res.json())
                .then(setBanks)
                .catch((error) => console.error("Getting all banks: fail"));
        }
        fetchData();
    }, []);

    const addTransaction = async (
        data: Omit<Transaction, "id" | "userId" | "createdAt">,
    ) => {
        const res = await fetch("/api/transactions", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error("Add Transaction:", err.error);
        }

        const newTransaction: Transaction = await res.json();
        setTransactions((prev) => [...prev, newTransaction]);
        setBanks((prevBanks) =>
            prevBanks.map((bank) =>
                bank.id === newTransaction.bankId
                    ? {
                          ...bank,
                          balance: bank.balance + newTransaction.amount,
                      }
                    : bank,
            ),
        );

        router.refresh()
    };

    const deleteTransaction = async (id: string) => {
        const res = await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error("Delete Transaction:", err.error);
        }
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.id !== id),
        );
        const deletedTransaction: Transaction = await res.json();
         setBanks((prevBanks) =>
            prevBanks.map((bank) =>
                bank.id === deletedTransaction.bankId
                    ? {
                          ...bank,
                          balance: bank.balance - deletedTransaction.amount,
                      }
                    : bank,
            ),
        );

        router.refresh()
    };

    const addBank = async (
        data: Omit<Bank, "id" | "userId" | "createdAt" | "transactions">,
    ) => {
        const res = await fetch("/api/banks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const newAccount: Bank = await res.json();
        setBanks((prev) => [...prev, newAccount]);
    };

    const deleteBank = async (id: string) => {
        await fetch(`/api/banks/${id}`, { method: "DELETE" });
        setBanks((prev) => prev.filter((bank) => bank.id !== id));
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.bankId !== id),
        );
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                banks,
                addTransaction,
                deleteTransaction,
                addBank,
                deleteBank,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context)
        throw new Error("useFinance must be used inside FinanceProvider");
    return context;
}

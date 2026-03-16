"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteBtn from "./DeleteBtn";

import { cn, formatDateTime, formatAmount } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";
import { useFinance } from "@/context/FinanceContext";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const { borderColor, backgroundColor, color, chipBackgroundColor } =
        transactionCategoryStyles[
            category as keyof typeof transactionCategoryStyles
        ];

    return (
        <div
            className={cn(
                "category-badge ml-auto",
                borderColor,
                chipBackgroundColor,
            )}
        >
            <div className={cn("size-2 rounded-full", backgroundColor)} />
            <p className={cn("text-[12px] font-medium", color)}>{category}</p>
        </div>
    );
};

export function TransactionTable({
    transactions,
    bankMap,
}: {
    transactions: Transaction[];
    bankMap?: Record<string, string>;
}) {
    const { deleteTransaction } = useFinance();

    return (
        <Table className="">
            <TableHeader>
                <TableRow className="*:font-bold *:text-md ">
                    <TableHead className="w-50">Transaction</TableHead>
                    <TableHead>Amount (VND)</TableHead>
                    <TableHead>Time</TableHead>
                    {bankMap && <TableHead>Bank Account</TableHead>}
                    <TableHead className="text-right">Category</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => {
                    const formatted = formatDateTime(
                        new Date(transaction.createdAt),
                    );
                    const isMinus =
                        transaction.amount < 0 ||
                        transaction.type === "EXPENSE";

                    return (
                        <TableRow
                            className={`${isMinus ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"} border-gray-200`}
                            key={transaction.id}
                        >
                            <TableCell className="font-semibold max-w-50">
                                <div className="flex items-center gap-3">
                                    <p className="truncate">
                                        {transaction.note.toUpperCase()}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell
                                className={`${isMinus ? "text-[#F04438]" : "text-[#039855]"} font-semibold`}
                            >
                                {`${isMinus ? "" : "+"}`}
                                {formatAmount(transaction.amount)}
                            </TableCell>
                            <TableCell>{formatted.dateTime}</TableCell>
                            {bankMap && (
                                <TableCell className="italic">
                                    {bankMap[transaction.bankId]?.toUpperCase()}
                                </TableCell>
                            )}

                            <TableCell className="text-right">
                                <CategoryBadge
                                    category={transaction.category}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <DeleteBtn
                                    id={transaction.id}
                                    deleteFunc={deleteTransaction}
                                    type="delete-transaction"
                                    subtitle="This will permanently delete the transaction. Are you sure?"
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

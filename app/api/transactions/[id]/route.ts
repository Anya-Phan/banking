import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { deleteUserTransactions } from "@/lib/actions/users.actions";
export const runtime = "nodejs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const transactions = await prisma.transaction.findMany({
        where: {
            userId: id,
        },
    });

    return NextResponse.json(transactions, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> },) {
    const { id } = await params;
    const deleteTransaction = await deleteUserTransactions(id)

    return NextResponse.json(deleteTransaction, { status: 200 });
}
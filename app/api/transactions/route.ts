import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { addUserTransactions } from "@/lib/actions/users.actions";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    const transactions = await prisma.transaction.findMany();

    return NextResponse.json(transactions, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newTransaction = await addUserTransactions(body);

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Server error: Create Transaction " },
            { status: 500 },
        );
    }
}

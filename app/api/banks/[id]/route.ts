import { NextResponse, NextRequest } from "next/server";
import { deleteUserBanks } from "@/lib/actions/users.actions"; 
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> },) {
    const { id } = await params;
    const deleteTransaction = await deleteUserBanks(id)

    return NextResponse.json(deleteTransaction, { status: 200 });
}
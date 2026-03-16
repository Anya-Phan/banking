import { NextResponse, NextRequest } from "next/server";
import { getUserBanks, addUserBanks } from "@/lib/actions/users.actions";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
    const banks = await getUserBanks();
    return NextResponse.json(banks, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newBank = await addUserBanks(body);
        return NextResponse.json(newBank, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: "Server error: Create Transaction " }, { status: 500 });
    }
}


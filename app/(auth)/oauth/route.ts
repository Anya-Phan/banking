import { createAdminClient } from "@/lib/appwrite";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");
    if (!userId || !secret) {
        return new NextResponse("OAuth2 did not provide token", {
            status: 400,
        });
    }

    const { account, user } = await createAdminClient();
    const session = await account.createSession({
        userId,
        secret,
    });

    //lấy user bằng admin API
    const logUser = await user.get(userId);

    // tạo user trong Prisma (hoặc update nếu đã tồn tại)
    await prisma.user.upsert({
        where: { id: logUser.$id },
        update: {
            email: logUser.email,
            name: logUser.name,
        },
        create: {
            id: logUser.$id,
            email: logUser.email,
            name: logUser.name,
        },
    });

    if (!session || !session.secret) {
        return new NextResponse("Failed to create session from token", {
            status: 400,
        });
    }

    const cookieStore = await cookies();
    cookieStore.set("my-custom-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/account`);
}

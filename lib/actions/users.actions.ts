"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

import prisma from "../prisma";

// User Actions
export async function signIn({ email, password }: signInProps) {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession({
            email,
            password,
        });
        const cookieStore = await cookies();
        cookieStore.set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(session);
    } catch (error) {
        return null;
    }
}

export async function getLoggedInUser() {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
        return null;
    }
    try {
        return await sessionClient.account.get();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function signUp(userData: SignUpParams) {
    const { email, password, firstName, lastName } = userData;
    try {
        const { account } = await createAdminClient();

        const newUser = await account.create({
            userId: ID.unique(),
            email,
            password,
            name: `${firstName} ${lastName}`,
        });

        await prisma.user.create({
            data: {
                id: newUser.$id,
                email: newUser.email,
                name: newUser.name,
            },
        });
        const session = await account.createEmailPasswordSession({
            email,
            password,
        });
        const cookieStore = await cookies();
        cookieStore.set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUser);
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function signOut() {
    try {
        const sessionClient = await createSessionClient();
        if (!sessionClient) {
            return null;
        }

        const cookieStore = await cookies();

        cookieStore.delete("my-custom-session");
        await sessionClient.account.deleteSession({ sessionId: "current" });
    } catch (error) {
        return null;
    }
}

// Transaction, Bank actions

export async function getUserTransactions() {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    return prisma.transaction.findMany({
        where: { userId: user.$id },
    });
}

export async function getUserBanks() {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    return prisma.bank.findMany({
        where: { userId: user.$id },
    });
}

export async function addUserTransactions(data: Transaction) {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");
    const result = await prisma.$transaction(async (tx) => {
        const newTransaction = await tx.transaction.create({
            data: {
                ...data,
                userId: user.$id,
            },
        });

        const updateBank = await tx.bank.update({
            where: { id: newTransaction.bankId },
            data: {
                balance: {
                    increment: newTransaction.amount,
                },
            },
        });
        return newTransaction;
    });

    return result;
}

export async function deleteUserTransactions(id: string) {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const result = await prisma.$transaction(async (tx) => {
        const deleteTransaction = await tx.transaction.delete({
            where: { id: id, userId: user.$id },
        });

        const updateBank = await tx.bank.update({
            where: { id: deleteTransaction.bankId },
            data: {
                balance: {
                    decrement: deleteTransaction.amount,
                },
            },
        });
        return deleteTransaction;
    });

    return result;
}

export async function addUserBanks(data: Bank) {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    return prisma.bank.create({
        data: {
            ...data,
            userId: user.$id,
        },
    });
}

export async function deleteUserBanks(id: string) {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.transaction.deleteMany({
        where: { bankId: id, userId: user.$id },
    });

    return prisma.bank.delete({
        where: { id: id, userId: user.$id },
    });
}

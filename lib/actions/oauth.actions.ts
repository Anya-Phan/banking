"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGoogle() {
    const { account } = await createAdminClient();

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    const redirectUrl = await account.createOAuth2Token({
        provider: OAuthProvider.Google,
        success: `${origin}/oauth`,
        failure: `${origin}/sign-up`,
    });

    return redirect(redirectUrl);
}

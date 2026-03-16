"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Account() {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, [router]);

    return <div className="w-screen h-screen flex-center font-bold text-bankGradient text-2xl"> <Loader2 className="animate-spin"/> Signing you in...</div>;
}

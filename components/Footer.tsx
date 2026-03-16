import Image from "next/image";
import { signOut } from "@/lib/actions/users.actions";
import { redirect, useRouter } from "next/navigation";
export default function Footer({ user }: FooterProps) {
    // const router = useRouter()
    async function handleSignOut() {
        const logOut = await signOut();
        if (logOut) redirect("/sign-in");
    }

    return (
        <footer className="footer mt-auto">
            <div className="footer_avatar">{user.name[0]}</div>
            <div className="flex-1 min-w-0">
                <p className="footer_name">{user.name}</p>
                <p className="footer_email">{user.email}</p>
            </div>
            <div onClick={handleSignOut}>
                <Image
                    src="/icons/logout.svg"
                    alt="log out"
                    width={30}
                    height={30}
                    className="footer_image"
                />
            </div>
        </footer>
    );
}

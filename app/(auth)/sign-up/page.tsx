import Image from "next/image";
import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/actions/users.actions";
export default async function SignUp() {
    const loginUser = await getLoggedInUser();
    return (
        <section className="flex w-full">
            <div className="basis-1/2 px-10 flex-center max-lg:basis-full">
                <AuthForm type="sign-up" />
            </div>
            <div className="flex-center basis-1/2 p-10 bg-blue-50 max-lg:hidden h-screen sticky right-0 top-0 bottom-0">
                <Image
                    src="/images/auth-image-2.svg"
                    alt="Sign In"
                    width={400}
                    height={200}
                />
            </div>
        </section>
    );
}

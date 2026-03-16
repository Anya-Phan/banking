import CardList from "@/components/CardList"
import { getLoggedInUser } from "@/lib/actions/users.actions";
export default async function MyBanks() {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) return;

    const user = {
        name: loggedUser.name,
        email: loggedUser.email,
    } as User;

    return (
        <section className="my-banks">
            <h1 className="font-semibold text-20 lg:text-2xl xl:text-3xl">
                My banks
            </h1>
            <CardList user={user}></CardList>
        </section>
    );
}

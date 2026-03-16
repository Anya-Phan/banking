import { AccordionBanks } from "@/components/AccordionBanks";
import { getLoggedInUser } from "@/lib/actions/users.actions";
export default async function TransactionHistory() {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) return;

    return (
        <section className="my-banks">
            <h1 className="font-semibold text-20 lg:text-2xl xl:text-3xl">
                Transaction History
            </h1>
            <AccordionBanks/>
        </section>
    );
}

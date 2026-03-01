import Image from "next/image";
export default function CreditCard({
    account,
    userName = "Guest",
    showBalance,
    imgURL,
}: CreditCardProps) {
    const bgVariants = {
        firstBg: "bg-[url(/images/bg-credit-card-1.png)]",
        secondBg: "bg-[url(/images/bg-credit-card-2.png)]",
    };
    const className = `bg-cover flex flex-col ${bgVariants[imgURL]} rounded-2xl p-3 text-white`

    return (
        <div className={className}>
            <Image
                src={"/icons/visa.svg"}
                width={200}
                height={200}
                alt="Credit Card"
                style={{
                    objectFit: "contain",
                    width: '50px',
                    height: "auto",
                    marginLeft: "auto",
                }}
            />
            <div className="text-md">
                {showBalance ? (
                    <p>{account.currentBalance}</p>
                ) : (
                    <p>●●●● VND</p>
                )}
            </div>

            <p className="text-lg my-2">●●●● ●●●● ●●●● 1234</p>
            <div className="mt-auto flex gap-10">
                <div>
                    <p className="text-10 font-extralight">CARD HOLDER NAME</p>
                    <p className="text-16 font-medium">{userName}</p>
                </div>
                <div>
                    <p className="text-10 font-extralight">VALID THRU</p>
                    <p className="text-16 font-medium">●●/●●</p>
                </div>
            </div>
        </div>
    );
}

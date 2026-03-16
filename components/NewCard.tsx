import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBankForm from "./AddBankForm";
export default function NewCard() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className=" text-gray-500 relative w-full pb-[62.5%] border border-dashed border-gray-500 rounded-2xl cursor-pointer">
                    <div className="absolute w-full  flex-center flex-col top-[50%] left-[50%] translate-[-50%]">
                        <p className="text-4xl">+</p>
                        <p className="text-md shrink-0">
                            Add a new bank account
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white max-h-screen overflow-auto ring-gray-300">
                <AddBankForm />
            </DialogContent>
        </Dialog>
    );
}

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { SubmitEvent } from "react";

interface DeleteBtnProps {
    id: string;
    deleteFunc:  (id: string) => Promise<void>;
    type: "delete-transaction" | "delete-bank";
    subtitle: string;
}

export default function DeleteBtn({ id, deleteFunc, type, subtitle }: DeleteBtnProps) {
    async function handleDelete(  e: SubmitEvent, id: string) {
        e.preventDefault()
        try {
            await deleteFunc(id);
        } catch (error) {
            console.error(error);
        } finally {
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {type === "delete-transaction" ? <Button
                    variant="outline"
                    className="p-1 border border-gray-300 cursor-pointer bg-white hover:bg-gray-100 rounded-lg"
                >
                    Delete
                </Button> : <Trash2Icon className="ml-auto"/>}
                
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs bg-white ring-gray-300">
                <DialogHeader className="text-center">
                    <div className="rounded-lg size-10 text-red-600 bg-red-200 flex-center mx-auto">
                        <Trash2Icon />
                    </div>
                    <DialogTitle className="text-red-600">Delete?</DialogTitle>
                    <DialogDescription>
                         {subtitle}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="border-none bg-gray-100">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="border-gray-300 bg-white"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <form onSubmit={(e)=>handleDelete(e,id)}>
                        <Button
                            type="submit"
                            className="text-red-600 bg-red-200"
                        >
                            Delete
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

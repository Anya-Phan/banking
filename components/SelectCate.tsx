import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function SelectCate({ options, name }: { options: string[], name: string}) {
 return (
        <Select name={name}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={`Select a category`} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {options.map((opt) => {
                        return (
                            <SelectItem className="hover:bg-gray-100" key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
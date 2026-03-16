import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function SelectBank({
    options,
    name,
}: {
    options: Bank[];
    name: string;
}) {
    return (
        <Select name={name}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={`Select a bank`} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {options.map((opt) => {
                        return (
                            <SelectItem
                                className="hover:bg-gray-100"
                                key={opt.name}
                                value={opt.name}
                            >
                                {opt.name}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

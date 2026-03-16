import { Eye, EyeOff } from "lucide-react";
interface ShowBalanceToggleProps {
  isShow: boolean;
  onCheckEye: ()=> void;
}

export default function ShowBalanceToggle({isShow, onCheckEye}: ShowBalanceToggleProps) {

  return (
    <button
      onClick={onCheckEye}
      className="relative h-4 w-4 "
    >
      <Eye
        className={`absolute inset-0 w-full transition-all duration-300 ${
          isShow ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      />

      <EyeOff
        className={`absolute inset-0 w-full transition-all duration-300 ${
          isShow ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
        }`}
      />
    </button>
  );
}
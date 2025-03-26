import Typography from "./Typography";

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function RememberMeCheckbox({ checked, onChange }: RememberMeCheckboxProps) {
  return (
    <Typography variant="p" className="flex items-center gap-2 cursor-pointer text-white">
      <span
        className={`w-5 h-5 rounded-md bg-[#224957] flex items-center justify-center relative transition-all duration-200`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`absolute w-2.5 h-1.5 border-green-500 top-1.5 border-b-2 border-l-2 rotate-320 scale-0 transition-transform duration-200 ${
            checked ? "scale-100" : ""
          }`}
        />
      </span>
      Remember me
    </Typography>
  );
}

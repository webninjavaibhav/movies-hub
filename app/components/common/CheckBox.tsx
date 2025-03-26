import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    labelClassName = "",
    containerClassName = "",
    ...props
}) => {
    return (
        <label className={`flex items-center cursor-pointer gap-2 ${containerClassName}`}>

            <input
                type="checkbox"
                className="w-5 h-5 rounded-md cursor-pointer transition-all duration-200 text-white"
                {...props}
            />
            {label && (
                <span className={`text-white text-[14px] ${labelClassName}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;

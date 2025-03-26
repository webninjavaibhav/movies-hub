import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "filled" | "outlined";
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "filled",
    className = "",
    ...props
}) => {
    const baseStyles =
        "py-[15px] rounded-lg font-bold";

    const variantStyles = {
        filled: "bg-[#2BD17E] text-white hover:bg-green-600",
        outlined: "border border-white text-white hover:bg-white hover:text-gray-900",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} cursor-pointer transition-all transition duration-500 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

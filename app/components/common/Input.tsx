import React from 'react';
import Typography from './Typography';

interface ClassNameProps {
  container?: string;
  label?: string;
  input?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classNames?: ClassNameProps;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  classNames,
  error,
  ...props
}) => {
  return (
    <div className={classNames?.container}>
      {label && (
        <label className={`mb-1 text-white text-sm ${classNames?.label}`}>
          {label}
        </label>
      )}
      <input
        className={`p-3 outline-0 focus-within:outline-1 focus-within:outline-[#224957] ${
          error && ' outline-1 !outline-[#EB5757]'
        } focus-within:text-[#224957] focus-within:bg-white w-full placeholder-white focus-within:placeholder-[#224957] rounded-[10px] bg-[#224957] text-[14px] font-normal ${
          classNames?.input
        }`}
        {...props}
      />
      {error && (
        <Typography
          variant='small'
          className=' text-left text-[#EB5757] mt-1'
        >
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;

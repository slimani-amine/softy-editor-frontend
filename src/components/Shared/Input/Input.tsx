import { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props<
  T extends FieldValues = FieldValues,
  U extends FieldValues = FieldValues
> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  type?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<U>;
}

const Input = <T extends FieldValues, U extends FieldValues>({
  disabled = false,
  placeholder,
  errors,
  label,
  name,
  value,
  type,
  register,
  ...rest
}: Props<T, U>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col w-full relative">
      <label
        className="block mb-1 text-sm font-normal text-[#949493]"
        htmlFor={name}
      >
        {label ?? ''}
      </label>
      <div className="relative">
        <input
          className="border rounded-lg w-full mb-2"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          type={type === 'password' && showPassword ? 'text' : type}
          {...register(name as Path<T>)}
          {...rest}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEye className="h-5 w-5 text-gray-400" />
            ) : (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {errors && errors[name as keyof U] && (
        <span className="text-red-500">
          {errors[name as keyof U]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;

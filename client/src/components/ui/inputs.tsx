import React from "react";

interface PropsInput {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name:string;
}

const Input = ({
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  required,
  name,
}: PropsInput) => {
  return (
    <div className="w-full">
      <label htmlFor={label} className="text-sm ">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <section className="flex justify-center items-center gap-2">
        {Icon && <Icon />}
        <input
          type={type}
          id={name}
          name={name}
          className="border border-gray-600 rounded-md pl-2 outline-none w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </section>
    </div>
  );
};

export default Input;

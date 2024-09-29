import React from "react";
import Input from "./inputs";
import { IconMore } from "./icons";
import { Button } from "./button";

interface InputData {
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  required?: boolean;
  name: string;
}

interface FormProps {
  action: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  inputs: InputData[];
}

const Form: React.FC<FormProps> = ({
  action,
  onClick,
  onChange,
  inputs,
  title,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="p-8"
    >
      <section className="flex justify-between w-full">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={onClick} label={action} icon={IconMore} />
      </section>

      {inputs.map((input, index) => (
        <Input
          name={input.name}
          key={index}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          icon={input.icon}
          value={input.value}
          required={input.required}
          onChange={onChange}
        />
      ))}
    </form>
  );
};

export default Form;

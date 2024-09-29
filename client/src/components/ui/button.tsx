interface ButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  icon: Icon,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-1 transition-all duration-500 
          bg-primary text-customWhite p-1 px-4 rounded-md 
          hover:bg-primary100 hover:text-black ${
            label ? "" : "justify-center"
          }`}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

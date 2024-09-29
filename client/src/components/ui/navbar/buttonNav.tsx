interface ButtonNavProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  important?: boolean;
}

export const ButtonNav = ({
  icon: Icon,
  label,
  important,
  onClick,
  ...props
}: ButtonNavProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-start items-center gap-4 font-semibold w-full p-1 px-2 rounded-md  group  text-gray-800 hover:text-violet-700 hover:bg-gray-100  ${
        important
          ? "text-primary mt-auto bg-gray-200 "
          : "bg-transparent w-full"
      }  ${label ? "" : "justify-center "} `}
      {...props}
    >
      {Icon && (
        <p className="text-gray-400 group-hover:text-violet-700">
          <Icon />
        </p>
      )}
      {label}
    </button>
  );
};

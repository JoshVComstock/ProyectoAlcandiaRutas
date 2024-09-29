interface Props {
  text: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ onClick, text, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary100 focus:outline-none disabled:grayscale"
    >
      {text}
    </button>
  );
};
export default Button;

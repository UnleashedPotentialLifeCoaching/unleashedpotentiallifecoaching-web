interface Props {
  label: string;
  handlePress?: () => void;
}
const Button = ({ label, handlePress }: Props) => (
  <button
    type="submit"
    onClick={handlePress}
    className="bg-forrest-900 hover:bg-forrest  text-white text-center py-4 px-12 text-xl rounded"
  >
    {label}
  </button>
);

export default Button;

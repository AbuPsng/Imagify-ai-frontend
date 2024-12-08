import { AuthInputProps } from "../types";

const AuthInput = ({
  value,
  onChange,
  icon,
  placeholder,
  type,
}: AuthInputProps) => {
  return (
    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
      <img src={icon} alt="" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="outline-none text-sm "
        required
      />
    </div>
  );
};

export default AuthInput;

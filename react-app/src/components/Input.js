import { StyledInput } from "./styles/StyledInput";

const Input = ({
  placeholder,
  icon: Icon,
  id,
  value,
  onChange,
  isInvalid,
  className,
}) => {
  let classes = className;
  classes += isInvalid ? "with-error" : "";

  return (
    <StyledInput>
      {Icon && <Icon className="icon" />}
      <input
        type="number"
        id={id}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledInput>
  );
};
export default Input;

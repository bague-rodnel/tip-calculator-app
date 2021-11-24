const Button = ({ className, text, isLit, onClick, isDisabled }) => {
  let classes = className;

  if (isLit) {
    classes += " lit";
  }
  return (
    <button className={classes} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;

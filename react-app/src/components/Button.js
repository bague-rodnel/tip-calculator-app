const Button = ({ className, text, isLit, onClick, isDisabled }) => {
  let classes = className;

  if (isLit) {
    classes += " lit";
  }
  return (
    <StyledButton className={classes} onClick={onClick} disabled={isDisabled}>
      {text}
    </StyledButton>
  );
};

export default Button;

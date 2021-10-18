import StyleSheet from "./button.module.scss";

const Button = ({ title, handleClick, children, disabled, ...rest }) => {
  return (
    <button
      style={{ ...rest }}
      className={[StyleSheet.btn, disabled && StyleSheet.btn__disabled].join(
        " "
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;

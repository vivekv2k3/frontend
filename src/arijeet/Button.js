import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  onClick,
  disabled = false,
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? "btn-full-width" : "";
  const disabledClass = disabled ? "btn-disabled" : "";

  const className = [baseClass, variantClass, widthClass, disabledClass]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

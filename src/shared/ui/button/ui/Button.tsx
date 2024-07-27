import React from "react";
import styles from "./button.module.scss";
export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isDefault?: boolean;
  isAuthButton?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type,
  disabled,
  isDefault,
  isAuthButton = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        isDefault
          ? styles.default
          : isAuthButton
          ? styles.authButton
          : styles.active
      } `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

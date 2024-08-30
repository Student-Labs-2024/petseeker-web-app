import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isDefault?: boolean;
  isAuthButton?: boolean;
  isSmall?: boolean;
  name?: string;
  value?: string | boolean;
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  disabled = false,
  isDefault = false,
  isAuthButton = false,
  isSmall = false,
  name,
  value,
  isLoading,
}) => {
  const buttonClass = classNames({
    [styles.small]: isSmall,
    [styles.default]: isDefault,
    [styles.active]: !isDefault,
    [styles.auth_default]: isDefault && isAuthButton,
    [styles.auth_active]: !isDefault && isAuthButton,
    [styles.active_loading]: isLoading && !isDefault,
  });

  return (
    <button
      value={value}
      name={name}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import React, { forwardRef, Ref } from "react";
import styles from "./input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import classNames from "classnames";
type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>; // Добавл
  placeholder?: string;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  id?: string;
  type?: string;
  accept?: string;
  multiple?: boolean;
  register?: UseFormRegisterReturn;
  myClass?: string;
  required?: boolean;
  errorMessage?: string | boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { myClass = "default", register, required, errorMessage, ...rest },
    ref: Ref<HTMLInputElement>
  ) => {
    const inputStyle = classNames(styles[myClass], {
      [styles.error]: errorMessage,
    });

    return (
      <>
        <input
          className={inputStyle}
          required={required}
          ref={ref}
          {...register}
          {...rest}
        />
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </>
    );
  }
);

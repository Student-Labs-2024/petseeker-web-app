import React, { forwardRef, Ref } from "react";
import styles from "./textArea.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import classNames from "classnames";
type TextAreaProps = {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>; // Добавл
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
  errorMessage?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { myClass = "default", register, required, errorMessage, ...rest },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const TextAreaStyle = classNames(styles[myClass], {
      [styles.error]: errorMessage,
    });

    return (
      <>
        <textarea
          className={TextAreaStyle}
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

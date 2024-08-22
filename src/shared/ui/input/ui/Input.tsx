import React, { forwardRef, Ref } from "react";
import styles from "./input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
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
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ myClass = "default", register, ...rest }, ref: Ref<HTMLInputElement>) => {
    return (
      <input className={styles[myClass]} ref={ref} {...register} {...rest} />
    );
  }
);

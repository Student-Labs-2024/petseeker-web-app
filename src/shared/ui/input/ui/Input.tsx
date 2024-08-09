import React from "react";
import styles from "./input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>; // Добавляем обработчик onKeyDown
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

export const Input: React.FC<InputProps> = ({
  myClass = "default",
  register,
  ...rest
}) => {
  return <input className={styles[myClass]} {...register} {...rest} />;
};

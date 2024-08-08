import React, { ChangeEventHandler, CSSProperties } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./textArea.module.scss";

type TextareaProps = {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  name?: string;
  style?: CSSProperties;
  id?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  myClass?: string;
};

export const TextArea: React.FC<TextareaProps> = ({
  register,
  myClass = "default",
  ...rest
}) => {
  return (
    <textarea className={styles[myClass]} {...register} {...rest}></textarea>
  );
};

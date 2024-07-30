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
  label?: string;
};

export const TextArea: React.FC<TextareaProps> = ({
  label,
  register,
  ...rest
}) => {
  return (
    <label className={styles.label}>
      {label}
      <textarea className={styles.default} {...register} {...rest}></textarea>
    </label>
  );
};

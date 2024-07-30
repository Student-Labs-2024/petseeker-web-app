import React from "react";
import styles from "./input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";


type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  id?: string;
  type?: string; 
  accept?: string;
  multiple?: boolean;
  register?: UseFormRegisterReturn;
};


export const Input: React.FC<InputProps> = ({  register, ...rest }) => {
  return (
 
      <input className={styles.default} {...register} {...rest} />

  );
};

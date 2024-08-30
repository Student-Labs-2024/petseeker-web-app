import React from "react";
import { useController, Control } from "react-hook-form";
import styles from "./radio.module.scss";
import classNames from "classnames";
import { ReactComponent as radioIcon } from "@shared/assets/error_radio.svg";
type RadioButtonProps = {
  name?: string;
  control?: Control<any>;
  value?: string;
  onChange?: (value: any) => void;
  required?: boolean;
};

export const Radio: React.FC<RadioButtonProps> = ({
  name,
  control,
  value,
  onChange: propsOnChange,
  required,
}) => {
  const {
    field: { onChange, onBlur, ref, value: fieldValue },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (propsOnChange) {
      propsOnChange(e.target.value);
    }
  };

  const checked = fieldValue === value;
  const radioClass = classNames(styles.custom, {
    [styles.active]: checked,
    [styles.error]: error,
  });

  return (
    <>
      <input
        className={styles.radio}
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        ref={ref}
      />
      <span className={radioClass}></span>
    </>
  );
};

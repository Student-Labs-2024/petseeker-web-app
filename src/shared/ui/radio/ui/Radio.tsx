import React from "react";
import { useController, Control } from "react-hook-form";
import styles from "./radio.module.scss";
import classNames from "classnames";

type RadioButtonProps = {
  name?: string;
  control?: Control<any>;
  value?: string;
  onChange?: (value: any) => void;
};

export const Radio: React.FC<RadioButtonProps> = ({
  name,
  control,
  value,
  onChange: propsOnChange,
}) => {
  const {
    field: { onChange, onBlur, ref, value: fieldValue },
  } = useController({
    name,
    control,
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

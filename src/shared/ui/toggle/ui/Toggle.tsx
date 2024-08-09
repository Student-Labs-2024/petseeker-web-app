import React from "react";
import { useController, Control } from "react-hook-form";
import styles from "./toggle.module.scss";
import classNames from "classnames";

type ToggleProps = {
  name?: string;
  control?: Control<any>;
  value?: string;
  onChange?: (value: any) => void;
};

export const Toggle: React.FC<ToggleProps> = ({
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

  const checked = !!fieldValue;
  const toggleClass = classNames(styles.custom, {
    [styles.active]: checked,
  });

  return (
    <>
      <input
        className={styles.toggle}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        ref={ref}
      />
      <span className={toggleClass}></span>
    </>
  );
};

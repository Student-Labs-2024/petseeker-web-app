import React, { CSSProperties } from "react";
import styles from "./label.module.scss";
type LabelProps = {
  children?: React.ReactNode;
  style?: CSSProperties;
};

export const Label: React.FC<LabelProps> = ({ style, children }) => {
  return (
    <label className={styles.default} style={style}>
      {children}
    </label>
  );
};

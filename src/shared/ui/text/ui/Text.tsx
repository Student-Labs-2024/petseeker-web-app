import React, { CSSProperties, ReactNode, JSXElementConstructor } from "react";
import styles from "./text.module.scss";

type TextProps = {
  children?: ReactNode;
  style?: CSSProperties;
  tag?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
  myClass?: string;
  color?: string;
};

export const Text: React.FC<TextProps> = ({
  myClass = "default",
  color = "black",
  tag: CustomTag = "span",
  children,
}) => {
  return <CustomTag className={`${styles[myClass]} ${styles[color]}`}>{children}</CustomTag>;
};

import React, { ChangeEventHandler, CSSProperties } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./textArea.module.scss";

// Определение типов для пропсов компонента TextArea
type TextareaProps = {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>; // Обработчик изменения для элемента <textarea>
  value?: string; // Значение для элемента <textarea>
  name?: string; // Имя для элемента <textarea>
  style?: CSSProperties; // Объект стилей для элемента <textarea>
  id?: string; // ID для элемента <textarea>
  register?: UseFormRegisterReturn; // Функция регистрации для интеграции с react-hook-form
  label?: string; // Метка для элемента <textarea>
};

// Компонент TextArea
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

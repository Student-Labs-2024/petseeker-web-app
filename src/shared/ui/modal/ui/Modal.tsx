import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { ReactComponent as DragIcon } from "@shared/assets/drag_icon.svg";
type ModalType = {
  children?: React.ReactNode;
  isFullScreen?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
};
export const Modal: React.FC<ModalType> = ({
  isFullScreen = false,
  children,
  isOpen = false,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  const modalContainerClass = classNames(styles.modal__container, {
    [styles.full_screan]: isFullScreen,
  });
  const modalClass = classNames(styles.modal, {
    [styles.close]: !isOpen,
  });

  return (
    <div className={modalClass}>
      <div className={modalContainerClass}>
        <DragIcon className={styles.drag_icon} />
        {children}
      </div>
    </div>
  );
};

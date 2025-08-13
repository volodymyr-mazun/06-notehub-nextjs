
// ----------КОМПОНЕНТ, ДЛЯ РОБОТИ З МОДАЛЬНИМ ВІКНОМ----------

import css from "./Modal.module.css";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";


interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick} >
      <div className={css.modal}>{children}</div>
    </div>,

    document.body
  );
};
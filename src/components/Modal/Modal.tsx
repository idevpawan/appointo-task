import React, { useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return <dialog ref={modalRef}>{children}</dialog>;
};

export default Modal;

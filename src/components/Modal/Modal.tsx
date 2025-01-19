/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import React from 'react';
import style from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
}

export default Modal;

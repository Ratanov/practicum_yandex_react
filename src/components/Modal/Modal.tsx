import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '@components/ModalOverlay';
import { ModalWrapper, ModalHeader } from './widgets';
import type { TModalProps } from '@shared/types';

const modalRoot = document.getElementById('modals') as HTMLElement;

export const Modal: FC<Omit<TModalProps, 'isOpen'>> = ({
  children,
  onClose,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalWrapper isVisible={isVisible}>
        <ModalHeader onClose={onClose} title={title} />
        {children}
      </ModalWrapper>
      <ModalOverlay isVisible={isVisible} onClose={onClose} />
    </>,
    modalRoot
  );
};
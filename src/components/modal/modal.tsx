import { FC } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '@components/modalOverlay';
import { ModalWrapper, ModalHeader } from './widgets';
import type { TModalProps } from '@shared/types';

const modalRoot = document.getElementById('modals') as HTMLElement;

export const Modal: FC<TModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalWrapper>
        <ModalHeader onClose={onClose} title={title} />
        {children}
      </ModalWrapper>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

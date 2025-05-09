import { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import { TModalProps } from '@shared/types';
import classes from './modalOverlay.module.css';

export const ModalOverlay: FC<Pick<TModalProps, 'onClose'>> = ({ onClose }) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      onClose();
    },
    [onClose]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return <div className={classes.overlay} onClick={handleClick} />;
};

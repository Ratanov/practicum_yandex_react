import { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { TModalProps } from '@shared/types';
import classes from './modalOverlay.module.css';

interface IModalOverlayProps extends Pick<TModalProps, 'onClose'> {
  isVisible: boolean;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose, isVisible }) => {
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
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={classNames(classes.overlay, {
        [classes.overlay_visible]: isVisible,
      })}
      onClick={handleClick}
      data-testid='modal-overlay'
    />
  );
};

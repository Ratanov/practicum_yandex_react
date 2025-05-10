import { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { TModalProps } from '@shared/types';
import classes from './modalOverlay.module.css';

type TModalOverlayProps = Pick<TModalProps, 'onClose'> & {
  isVisible: boolean;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({
  onClose,
  isVisible,
}) => {
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

  return (
    <div
      className={classNames(classes.overlay, {
        [classes.overlay_visible]: isVisible,
      })}
      onClick={handleClick}
    />
  );
};

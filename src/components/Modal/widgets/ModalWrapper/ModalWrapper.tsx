import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import classes from './modalWrapper.module.css';

interface IModalWrapperProps extends PropsWithChildren {
  isVisible: boolean;
}

export const ModalWrapper: FC<IModalWrapperProps> = ({
  children,
  isVisible,
}) => {
  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.wrapper_visible]: isVisible,
      })}
      data-cy='modal-content-wrapper'>
      {children}
    </div>
  );
};

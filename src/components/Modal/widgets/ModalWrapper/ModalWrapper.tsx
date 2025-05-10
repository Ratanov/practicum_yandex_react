import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import classes from './modalWrapper.module.css';

type TModalWrapperProps = PropsWithChildren<{
  isVisible: boolean;
}>;

export const ModalWrapper: FC<TModalWrapperProps> = ({
  children,
  isVisible,
}) => {
  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.wrapper_visible]: isVisible,
      })}>
      {children}
    </div>
  );
};

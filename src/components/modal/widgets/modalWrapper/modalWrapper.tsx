import { FC, PropsWithChildren } from 'react';
import classes from './modalWrapper.module.css';

export const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

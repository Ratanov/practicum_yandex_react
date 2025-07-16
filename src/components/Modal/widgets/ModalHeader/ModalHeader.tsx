import { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import type { TModalProps } from '@shared/types';
import classes from './modalHeader.module.css';

export const ModalHeader: FC<Pick<TModalProps, 'onClose' | 'title'>> = ({
  onClose,
  title,
}) => {
  return (
    <div
      className={classNames(
        classes.header,
        title ? classes.header_justified : classes.header_end
      )}>
      {title && <span className='text text_type_main-large'>{title}</span>}
      <button
        type='button'
        onClick={onClose}
        className={classes.header__close}
        data-cy='modal-close'>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

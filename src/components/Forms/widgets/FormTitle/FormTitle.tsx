import { FC } from 'react';
import classNames from 'classnames';
import styles from './formTitle.module.css';

export const FormTitle: FC<{ text: string }> = ({ text }) => {
  return (
    <h3 className={classNames('text text_type_main-medium', styles.title)}>
      {text}
    </h3>
  );
};

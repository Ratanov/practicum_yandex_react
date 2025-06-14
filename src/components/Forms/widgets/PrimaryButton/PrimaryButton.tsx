import { FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import styles from './primaryButton.module.css';

export const PrimaryButton: FC<{ text: string }> = ({ text }) => {
  return (
    <Button
      extraClass={classNames(styles.button)}
      htmlType='submit'
      type='primary'>
      {text}
    </Button>
  );
};

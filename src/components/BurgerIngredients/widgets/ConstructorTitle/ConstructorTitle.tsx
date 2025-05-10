import { FC } from 'react';
import classNames from 'classnames';
import classes from './constructorTitle.module.css';

export const ConstructorTitle: FC = () => {
  return (
    <h1 className={classNames('text text_type_main-large', classes['title'])}>
      Соберите бургер
    </h1>
  );
};

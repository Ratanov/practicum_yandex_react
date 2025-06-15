import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';

import styles from './formFooter.module.css';

type TFormFooter = {
  text?: string;
} & ( // если будет добавлен один из параметров, второй будет обязателен
  | { linkText?: undefined; to?: undefined }
  | { linkText: string; to: string }
);

export const FormFooter: FC<{ data: Array<TFormFooter> }> = ({ data }) => {
  return (
    <div className={styles.footer}>
      {data.map((item, index) => {
        return (
          <p className={styles.footer__text} key={index}>
            {item?.text && (
              <span
                className={classNames(
                  'text text_type_main-default',
                  'text_color_inactive'
                )}>
                {item?.text}
              </span>
            )}{' '}
            {item?.linkText && (
              <Link
                to={item.to}
                className={classNames(
                  'text text_type_main-default',
                  styles.footer__link
                )}>
                {item.linkText}
              </Link>
            )}
          </p>
        );
      })}
    </div>
  );
};

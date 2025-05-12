import { FC } from 'react';
import classes from './spinner.module.css';

export const Spinner: FC<{ description?: string }> = ({ description }) => {
  return (
    <div className={classes.spinner}>
      <div className={classes.spinner__element} />
      {description && (
        <p className='text text_type_main-default'>{description}</p>
      )}
    </div>
  );
};

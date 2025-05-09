import classNames from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import classes from './pageContainer.module.css';

type TPageContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const PageContainer: FC<TPageContainerProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <section
      className={classNames(classes.container, className)}
      {...otherProps}>
      {children}
    </section>
  );
};

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import classNames from 'classnames';
import classes from './headerButton.module.css';

interface IHeaderButtonProps {
  Icon: FC<TIconProps>;
  title: string;
  route: string;
  isActive?: boolean;
}

export const HeaderButton: FC<IHeaderButtonProps> = ({
  Icon,
  title,
  route,
  isActive,
}) => {
  const titleClassName = classNames('text text_type_main-default', {
    text_color_inactive: !isActive,
  });

  return (
    <Link to={route} className={classNames(classes['button'])}>
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <p className={titleClassName}>{title}</p>
    </Link>
  );
};

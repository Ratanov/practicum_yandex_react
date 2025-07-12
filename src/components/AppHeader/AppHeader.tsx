import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './widgets';
import classNames from 'classnames';
import classes from './appHeader.module.css';

enum EHeaderButton {
  CONSTRUCTOR = 'Конструктор',
  FEED = 'Лента заказов',
  PROFILE = 'Личный кабинет',
}

const paths = {
  '/': EHeaderButton.CONSTRUCTOR,
  '/feed': EHeaderButton.FEED,
  '/profile': EHeaderButton.PROFILE,
};

export const AppHeader = () => {
  const location = useLocation();

  const activeButton = useMemo(() => {
    const { pathname } = location;

    if (pathname === '/') {
      return paths['/'];
    }

    if (pathname.startsWith('/feed')) {
      return paths['/feed'];
    }

    if (pathname.startsWith('/profile')) {
      return paths['/profile'];
    }
  }, [location]);

  return (
    <header className={classes['header']}>
      <nav className={classes['header__nav']}>
        <ul className={classes['header__list']}>
          <div
            className={classNames(
              classes['header__group'],
              classes['header__group_position_left']
            )}>
            <li className={classes['header__item']}>
              <HeaderButton
                isActive={EHeaderButton.CONSTRUCTOR === activeButton}
                Icon={BurgerIcon}
                title={EHeaderButton.CONSTRUCTOR}
                route='/'
              />
            </li>
            <li className={classes['header__item']}>
              <HeaderButton
                isActive={EHeaderButton.FEED === activeButton}
                Icon={ListIcon}
                title={EHeaderButton.FEED}
                route='/feed'
              />
            </li>
          </div>

          <li className={classes['header__item']}>
            <Link to='/'>
              <Logo />
            </Link>
          </li>

          <li
            className={classNames(
              classes['header__group'],
              classes['header__group_position_right']
            )}>
            <HeaderButton
              isActive={EHeaderButton.PROFILE === activeButton}
              Icon={ProfileIcon}
              title={EHeaderButton.PROFILE}
              route='/profile'
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

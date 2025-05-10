import { useState } from 'react';
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
  ORDERS = 'Лента заказов',
  PROFILE = 'Личный кабинет',
}

export const AppHeader = () => {
  const [activeButton, setActiveButton] = useState<EHeaderButton>(
    EHeaderButton.CONSTRUCTOR
  );

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
              />
            </li>
            <li className={classes['header__item']}>
              <HeaderButton
                isActive={EHeaderButton.ORDERS === activeButton}
                Icon={ListIcon}
                title={EHeaderButton.ORDERS}
              />
            </li>
          </div>

          <li className={classes['header__item']}>
            <Logo />
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
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

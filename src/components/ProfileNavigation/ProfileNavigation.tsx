import { useMemo, FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/services/hooks';
import { logoutUser } from '@shared/services/reducers/userSlice';
import classNames from 'classnames';
import styles from './profile-navigation.module.css';
import { getCookie } from '@shared/utils/cookie';

const routes = {
  profile: '/profile',
  orders: '/profile/orders',
} as const;

const descriptions = {
  [routes.profile]:
    'В этом разделе вы можете изменить свои персональные данные',
  [routes.orders]: 'В этом разделе вы можете просмотреть свою историю заказов',
} as const;

type TRoute = keyof typeof descriptions;

export const ProfileNavigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const activeTab = useMemo((): TRoute | '' => {
    const { pathname } = location;
    if (pathname.startsWith(routes.orders)) return routes.orders;
    if (pathname.startsWith(routes.profile)) return routes.profile;
    return '';
  }, [location]);

  const handleLogout = async () => {
    const token = getCookie("refreshToken");
    await dispatch(logoutUser({ token }));
    navigate('/');
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {[
          { path: routes.profile, text: 'Профиль', delay: 1 },
          { path: 'orders', text: 'История заказов', delay: 2 },
        ].map(({ path, text, delay }) => (
          <li
            key={path}
            className={classNames(styles.item, styles[`item_delay_${delay}`])}>
            <Link
              to={path}
              className={classNames(styles.link, 'text text_type_main-medium', {
                text_color_inactive: activeTab !== path,
              })}>
              {text}
            </Link>
          </li>
        ))}
        <li className={classNames(styles.item, styles.item_delay_3)}>
          <button
            className={classNames(
              styles.button,
              'text text_type_main-medium text_color_inactive'
            )}
            onClick={handleLogout}>
            Выход
          </button>
        </li>
      </ul>
      <p
        className={classNames(
          styles.description,
          'text text_type_main-small text_color_inactive'
        )}>
        {activeTab && descriptions[activeTab as TRoute]}
      </p>
    </nav>
  );
};

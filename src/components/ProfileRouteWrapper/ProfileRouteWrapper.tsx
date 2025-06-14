import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../ProfileNavigation';
import classes from './profileRouteWrapper.module.css';

export const ProfileRouteWrapper = () => {
  return (
    <div className={classes['profile-route']}>
      <ProfileNavigation />
      <Outlet />
    </div>
  );
};

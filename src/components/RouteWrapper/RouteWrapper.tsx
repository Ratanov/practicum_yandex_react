import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../AppHeader';
import classes from './routeWrapper.module.css';

export const RouteWrapper: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={classes['route-wrapper']}>
        <Outlet />
      </main>
    </>
  );
};

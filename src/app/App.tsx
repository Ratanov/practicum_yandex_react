import { FC, useEffect, useLayoutEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '@shared/services/hooks';
import store from '@shared/services/store/store';
import { loadIngredients } from '@shared/services/reducers/ingredientsSlice';
import { initUser } from '@shared/services/reducers/userSlice';
import { Modal } from '@components/Modal';
import {
  ModalIngredientDetails,
  ProfileRouteWrapper,
  RouteWrapper,
} from '@components/index';
import {
  Page404,
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '@pages/index';
import { ProtectedRouteElement } from '@components/ProtectedRouteElement';
import styles from './app.module.scss';

const AppContent: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(initUser());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<RouteWrapper />}>
          <Route index element={<ConstructorPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />
          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route
            path='profile'
            element={
              <ProtectedRouteElement element={<ProfileRouteWrapper />} />
            }>
            <Route index element={<ProfilePage />} />
            <Route path='orders' element={<div />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <ModalIngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.app}>
            <AppContent />
          </div>
        </DndProvider>
      </Provider>
    </BrowserRouter>
  );
};

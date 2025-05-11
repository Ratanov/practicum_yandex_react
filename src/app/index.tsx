import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '@shared/services/hooks';
import store from '@shared/services/store/store';
import { loadIngredients } from '@shared/services/reducers/ingredientsSlice';
import { AppHeader } from '@components/AppHeader';
import { ConstructorPage } from '@pages/ConstructorPage';
import classes from './app.module.scss';

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={classes['app']}>
        <AppHeader />
        <ConstructorPage />
      </main>
    </DndProvider>
  );
};

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

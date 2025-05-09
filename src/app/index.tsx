import { AppHeader } from '@components/appHeader';
import { ConstructorPage } from '@pages/constructorPage';
import classes from './app.module.scss';
import {
  IngredientsDataProvider,
  SelectedIngredientsProvider,
} from '@shared/contexts';

export function App() {
  return (
    <main className={classes['app']}>
      <IngredientsDataProvider>
        <SelectedIngredientsProvider>
          <AppHeader />
          <ConstructorPage />
        </SelectedIngredientsProvider>
      </IngredientsDataProvider>
    </main>
  );
}

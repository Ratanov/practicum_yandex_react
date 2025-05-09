import { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { ETabs } from '../../tabs.enum';
import classes from './ingredientsTabs.module.css';

interface IngredientsTabsProps {
  activeTab: string;
  setActiveTab: (value: ETabs) => void;
}

const TABS = [
  { value: ETabs.BUN, label: ETabs.BUN },
  { value: ETabs.SAUCE, label: ETabs.SAUCE },
  { value: ETabs.MAIN, label: ETabs.MAIN },
];

export const IngredientsTabs: FC<IngredientsTabsProps> = ({
  setActiveTab,
  activeTab,
}) => {
  const handleTabClick = (value: string) => setActiveTab(value as ETabs);

  return (
    <ul className={classes['tabs']}>
      {TABS.map(({ value, label }) => (
        <li key={value} className={classes['tabs__item']}>
          <Tab
            value={value}
            active={value === activeTab}
            onClick={handleTabClick}>
            <p className='text text_type_main-default'>{label}</p>
          </Tab>
        </li>
      ))}
    </ul>
  );
};

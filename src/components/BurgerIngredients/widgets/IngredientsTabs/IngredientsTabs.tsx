import { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ETabs } from '../../tabs.enum'
import { titles } from '../../titles.const';
import classes from './ingredientsTabs.module.css';

type TIngredientsTabsProps = {
  activeTab: string;
  setActiveTab: (value: ETabs) => void;
};

const TABS = [ETabs.BUN, ETabs.SAUCE, ETabs.MAIN];

export const IngredientsTabs: FC<TIngredientsTabsProps> = ({
  setActiveTab,
  activeTab,
}) => {
  return (
    <ul className={classes.tabs}>
      {TABS.map((tab) => (
        <li key={tab} className={classes.tabs__item}>
          <Tab
            value={tab}
            active={tab === activeTab}
            onClick={(value) => setActiveTab(value as ETabs)}>
            <p className='text text_type_main-default'>{titles[tab]}</p>
          </Tab>
        </li>
      ))}
    </ul>
  );
};

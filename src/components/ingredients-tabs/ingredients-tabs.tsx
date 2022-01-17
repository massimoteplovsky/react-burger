import { FC } from 'react';
import s from './ingredients-tabs.module.css';
import { TAB_ITEMS } from '../../utils/constants';

// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TComponentProps = {
  activeTab: string;
  setIsScrollMethod: (isScrollMethod: boolean) => void;
  setActiveTab: (type: string) => void;
};

const IngredientsTabs: FC<TComponentProps> = ({
  activeTab,
  setIsScrollMethod,
  setActiveTab,
}) => {
  return (
    <div className={s.tabsBlock}>
      {TAB_ITEMS.map(({ name, type }) => (
        <Tab
          key={type}
          value={name}
          active={activeTab === type}
          onClick={() => {
            setActiveTab(type);
            setIsScrollMethod(false);
          }}
        >
          {name}
        </Tab>
      ))}
    </div>
  );
};

export default IngredientsTabs;

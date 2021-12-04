import pt from 'prop-types';
import s from './ingredients-tabs.module.css';
import { TAB_ITEMS } from '../../utils/constants';

// Components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsTabs = ({ activeTab, setIsScrollMethod, setActiveTab }) => {
  return (
    <div className={`${s.tabsBlock} mb-10`}>
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

IngredientsTabs.propTypes = {
  activeTab: pt.string.isRequired,
  setIsScrollMethod: pt.func.isRequired,
  setActiveTab: pt.func.isRequired,
};

export default IngredientsTabs;

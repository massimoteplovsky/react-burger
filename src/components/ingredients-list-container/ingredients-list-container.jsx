import { useRef, useMemo, useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import pt from 'prop-types';
import s from './ingredients-list-container.module.css';
import { TAB_ITEMS } from '../../utils/constants';
import { getFilteredIngredients } from '../../services/ducks/ingredients';

// Components
import IngredientsList from '../ingredients-list/ingredients-list';

const IngredientsListContainer = ({
  isScrollMethod,
  activeTab,
  setIsScrollMethod,
  setActiveTab,
}) => {
  const filteredIngredients = useSelector(getFilteredIngredients);
  const containerRef = useRef();
  const ingredientsTitleRef = useMemo(() => {
    return TAB_ITEMS.reduce((acc, { type }) => {
      acc[type] = createRef(null);
      return acc;
    }, {});
  }, []);

  const handleScroll = () => {
    const [nearestTitle] = TAB_ITEMS.reduce((acc, { type }) => {
      acc.push({
        type,
        distance: Math.abs(
          containerRef.current.getBoundingClientRect().top -
            ingredientsTitleRef[type].current.getBoundingClientRect().top
        ),
      });
      return acc;
    }, []).sort((a, b) => a.distance - b.distance);

    if (activeTab !== nearestTitle.type) {
      setActiveTab(nearestTitle.type);
      setIsScrollMethod(true);
    }
  };

  useEffect(() => {
    if (!isScrollMethod) {
      ingredientsTitleRef[activeTab].current.scrollIntoView();
    }
  }, [activeTab, ingredientsTitleRef, isScrollMethod]);

  return (
    <div
      className={s.ingredientsContainer}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {useMemo(
        () =>
          TAB_ITEMS.map(({ name, type }) => (
            <IngredientsList
              key={type}
              ref={ingredientsTitleRef[type]}
              title={name}
              ingredients={filteredIngredients[type]}
            />
          )),
        [filteredIngredients, ingredientsTitleRef]
      )}
    </div>
  );
};
IngredientsListContainer.propTypes = {
  isScrollMethod: pt.bool.isRequired,
  activeTab: pt.string.isRequired,
  setIsScrollMethod: pt.func.isRequired,
  setActiveTab: pt.func.isRequired,
};

export default IngredientsListContainer;

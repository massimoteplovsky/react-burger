import {
  useRef,
  useMemo,
  useEffect,
  createRef,
  FC,
  Ref,
  RefObject,
} from 'react';
import { useSelector } from 'react-redux';
import s from './ingredients-list-container.module.css';
import { TAB_ITEMS } from '../../utils/constants';
import { getFilteredIngredients } from '../../services/ducks/ingredients/ingredients';

// Components
import IngredientsList from '../ingredients-list/ingredients-list';

type TComponentProps = {
  isScrollMethod: boolean;
  activeTab: string;
  setIsScrollMethod: (IsScrollMethod: boolean) => void;
  setActiveTab: (activeTab: string) => void;
};

type TScrollElement = {
  type: string;
  distance: number;
};

type TRefKeys = {
  [key: string]: Ref<HTMLHeadingElement>;
};

const IngredientsListContainer: FC<TComponentProps> = ({
  isScrollMethod,
  activeTab,
  setIsScrollMethod,
  setActiveTab,
}) => {
  const filteredIngredients = useSelector(getFilteredIngredients);
  const containerRef = useRef<HTMLDivElement>(null);
  const ingredientsTitleRef = useMemo(() => {
    return TAB_ITEMS.reduce<
      Record<keyof TRefKeys, RefObject<HTMLHeadingElement>>
    >((acc, { type }) => {
      acc[type] = createRef();
      return acc;
    }, {});
  }, []);

  const handleScroll = () => {
    const [nearestTitle] = TAB_ITEMS.reduce<TScrollElement[]>(
      (acc, { type }) => {
        acc.push({
          type,
          distance: Math.abs(
            containerRef.current.getBoundingClientRect().top -
              ingredientsTitleRef[type].current.getBoundingClientRect().top
          ),
        });
        return acc;
      },
      []
    ).sort((a, b) => a.distance - b.distance);

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

export default IngredientsListContainer;

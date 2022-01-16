import { FC, memo } from 'react';
import { TIngredient } from '../../utils/prop-validator';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BunPosition } from '../../utils/constants';

// Components
import NoIngredient from '../no-ingredient/no-ingredient';

type TComponentProps = {
  ingredient: TIngredient;
  position: 'top' | 'bottom' | undefined;
};

const BunIngredient: FC<TComponentProps> = ({ ingredient, position }) => {
  const positionName = position === BunPosition.TOP ? 'верх' : 'низ';

  if (!ingredient)
    return <NoIngredient>Выберите булку ({positionName})</NoIngredient>;

  const { name, price, image_mobile } = ingredient;

  return (
    <ConstructorElement
      type={position}
      isLocked={true}
      text={`${name} (${positionName})`}
      price={price}
      thumbnail={image_mobile}
    />
  );
};

export default memo(BunIngredient);

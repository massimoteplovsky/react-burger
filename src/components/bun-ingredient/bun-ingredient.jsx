import { memo } from 'react';
import pt from 'prop-types';
import { PropValidator } from '../../utils/prop-validator';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { BunPosition } from '../../utils/constants';

// Components
import NoIngredient from '../no-ingredient/no-ingredient';

const BunIngredient = ({ ingredient, position }) => {
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

BunIngredient.propTypes = {
  ingredient: pt.oneOfType([
    PropValidator.INGREDIENT.isRequired,
    pt.oneOf([null]).isRequired,
  ]),
  position: pt.string.isRequired,
};

export default memo(BunIngredient);

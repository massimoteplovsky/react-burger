import { FC } from 'react';
import { TIngredient } from '../../utils/prop-validator';
import cn from 'classnames';
import s from './ingredient-details.module.css';

type TComponentProps = {
  ingredient: TIngredient;
};

const IngredientDetails: FC<TComponentProps> = ({ ingredient }) => {
  const { image_large, name, calories, fat, proteins, carbohydrates } =
    ingredient;

  const energyValues = [
    {
      title: 'Калории,ккал',
      value: calories,
    },
    {
      title: 'Белки,г',
      value: proteins,
    },
    {
      title: 'Жиры,г',
      value: fat,
    },
    {
      title: 'Углеводы,г',
      value: carbohydrates,
    },
  ];

  return (
    <div className={s.container}>
      <img src={image_large} alt={name} className="mb-4" />
      <p className={cn(s.name, 'text', 'text_type_main-medium')}>{name}</p>
      <section className={s.energyValueBlock}>
        {energyValues.map(({ title, value }, index) => (
          <div className={cn(s.valueItem, 'text_color_inactive')} key={index}>
            <span className="text text_type_main-default mb-2">{title}</span>
            <span className="text text_type_digits-default">{value}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default IngredientDetails;

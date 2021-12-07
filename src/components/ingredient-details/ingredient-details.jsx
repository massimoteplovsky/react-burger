import { PropValidator } from '../../utils/prop-validator';
import s from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
  const {
    image_large,
    name,
    calories,
    fat,
    proteins,
    carbohydrates,
  } = ingredient;

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
      <p className={`${s.name} text text_type_main-medium mb-8`}>{name}</p>
      <section className={s.energyValueBlock}>
        {energyValues.map(({ title, value }, index) => (
          <div className={`${s.valueItem} text_color_inactive`} key={index}>
            <span className="text text_type_main-default mb-2">{title}</span>
            <span className="text text_type_digits-default">{value}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropValidator.INGREDIENT.isRequired,
};

export default IngredientDetails;

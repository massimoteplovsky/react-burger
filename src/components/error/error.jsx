import pt from 'prop-types';
import s from './error.module.css';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Error = ({ children }) => {
  return (
    <div className={s.errorWrapper}>
      <div className={s.errorContainer}>
        <InfoIcon type="primary" />
        <h1 className="text text_type_main-large">{children}</h1>
      </div>
    </div>
  );
};

Error.propTypes = {
  children: pt.node.isRequired,
};

export default Error;

import pt from 'prop-types';
import s from './form-error.module.css';

const FormError = ({ children }) => {
  return (
    <p className={`${s.errorText} text text_type_main-default mb-4`}>
      {children}
    </p>
  );
};

FormError.propTypes = {
  children: pt.node.isRequired,
};

export default FormError;

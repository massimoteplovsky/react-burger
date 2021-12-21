import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './forgot-password.module.css';
import { useForm } from '../../hooks/form';
import { RoutePath } from '../../utils/constants';
import {
  getUserState,
  resetStatus,
  sendUserEmailToResetPassword,
} from '../../services/ducks/user';
import { checkAuth } from '../../utils/helpers';

// Components
import FormError from '../../components/form-error/form-error';

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = checkAuth();
  const { isLoading, isError, success } = useSelector(getUserState);
  const { formData, handleChangeFormData } = useForm({
    email: '',
  });
  const { email } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendUserEmailToResetPassword(formData));
  };

  useEffect(() => {
    if (success) {
      return history.push({
        pathname: RoutePath.RESET_PASSWORD,
        state: { isFromForgotPasswordPage: true },
      });
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, history, success]);

  if (success) {
    return (
      <Redirect
        to={{
          pathname: RoutePath.RESET_PASSWORD,
          state: { isFromForgotPasswordPage: true },
        }}
      />
    );
  }

  if (isAuth) {
    return <Redirect to={{ pathname: RoutePath.HOME }} />;
  }

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={`${s.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h2>
        {isError && <FormError>Произошла ошибка при отправке email</FormError>}
        <form className={s.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={handleChangeFormData}
            value={email}
            name="email"
          />
          <Button type="primary" size="medium" disabled={isLoading}>
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-small mb-4">
          Вспомнили пароль?{' '}
          <Link to={RoutePath.LOGIN} className={s.link}>
            Войти
          </Link>
        </p>
      </section>
    </div>
  );
};

export default ForgotPassword;

import { useEffect, FC, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './reset-password.module.css';
import { useForm } from '../../hooks/form';
import { RoutePath } from '../../utils/constants';
import {
  getUserState,
  resetStatus,
  resetPassword,
} from '../../services/ducks/user/user';
import { checkAuth } from '../../utils/helpers';

// Components
import FormError from '../../components/form-error/form-error';

type TLocationState = {
  isFromForgotPasswordPage: boolean;
};

const ResetPassword: FC = () => {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const isFromForgotPasswordPage = location.state?.isFromForgotPasswordPage;
  const dispatch = useDispatch();
  const isAuth = checkAuth();
  const { isLoading, isError, success } = useSelector(getUserState);
  const { formData, handleChangeFormData } = useForm({
    token: '',
    password: '',
  });
  const { token = '', password = '' } = formData;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    await dispatch(resetPassword(formData));
  };

  useEffect(() => {
    if (success) {
      return history.push({ pathname: RoutePath.LOGIN });
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, history, success]);

  if (isAuth) {
    return <Redirect to={{ pathname: RoutePath.HOME }} />;
  }

  if (!isFromForgotPasswordPage) {
    return <Redirect to={{ pathname: RoutePath.FORGOT_PASSWORD }} />;
  }

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        {isError && (
          <FormError>Произошла ошибка при восстановлении пароля</FormError>
        )}
        <form className={s.form} onSubmit={handleSubmit}>
          <PasswordInput
            onChange={handleChangeFormData}
            value={password}
            name="password"
          />
          <Input
            placeholder="Введите код из письма"
            onChange={handleChangeFormData}
            value={token}
            name="token"
          />
          {!isLoading && (
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          )}
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

export default ResetPassword;

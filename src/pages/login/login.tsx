import { SyntheticEvent, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './login.module.css';
import { useForm } from '../../hooks/form';
import { RoutePath } from '../../utils/constants';
import {
  getUserState,
  loginUser,
  resetStatus,
} from '../../services/ducks/user/user';
import { checkAuth } from '../../utils/helpers';

// Components
import FormError from '../../components/form-error/form-error';

type TLocationState = {
  from: {
    pathname: string;
  };
};

const Login: FC = () => {
  const dispatch = useDispatch();
  const isAuth = checkAuth();
  const location = useLocation<TLocationState>();
  const { isLoading, isError, success } = useSelector(getUserState);
  const { formData, handleChangeFormData } = useForm({
    email: '',
    password: '',
  });
  const { email = '', password = '' } = formData;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    await dispatch(loginUser(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  if (isAuth || success) {
    return (
      <Redirect
        to={{
          pathname: location.state
            ? location.state.from.pathname
            : RoutePath.HOME,
        }}
      />
    );
  }

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        {isError && <FormError>Неверный email или пароль</FormError>}
        <form className={s.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={handleChangeFormData}
            value={email}
            name="email"
          />
          <PasswordInput
            onChange={handleChangeFormData}
            value={password}
            name="password"
          />
          {!isLoading && (
            <Button type="primary" size="medium">
              Войти
            </Button>
          )}
        </form>
        <p className="text text_type_main-small mb-4">
          Вы новый пользователь?{' '}
          <Link to={RoutePath.REGISTRATION} className={s.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-small">
          Забыли пароль?{' '}
          <Link to={RoutePath.FORGOT_PASSWORD} className={s.link}>
            Восстановить пароль
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;

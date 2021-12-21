import { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './registration.module.css';
import { useForm } from '../../hooks/form';
import { RoutePath } from '../../utils/constants';
import {
  getUserState,
  registerUser,
  resetStatus,
} from '../../services/ducks/user';
import { checkAuth } from '../../utils/helpers';

// Components
import FormError from '../../components/form-error/form-error';

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = checkAuth();
  const { isLoading, isError, success } = useSelector(getUserState);
  const { formData, handleChangeFormData } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  if (isAuth || success) {
    return <Redirect to={{ pathname: RoutePath.HOME }} />;
  }

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={`${s.title} text text_type_main-medium mb-6`}>
          Регистрация
        </h2>
        {isError && <FormError>Произошла ошибка при регистрации</FormError>}
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Имя"
            onChange={handleChangeFormData}
            value={name}
            name="name"
          />
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
          <Button type="primary" size="medium" disabled={isLoading}>
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-small">
          Уже зарегистрированы?{' '}
          <Link to={RoutePath.LOGIN} className={s.link}>
            Войти
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Registration;

import { FC, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-form.module.css';
import { useForm } from '../../hooks/form';
import { getUserState, updateUserData } from '../../services/ducks/user';

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserState);
  const { formData, isEdited, handleChangeFormData, handleResetFormData } =
    useForm({
      name: userData?.name || '',
      email: userData?.email || '',
      password: '',
    });
  const { name = '', email = '', password = '' } = formData;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    await dispatch(updateUserData(formData));
  };

  return (
    <div className={s.container}>
      <section className={s.section}>
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder="Имя"
            onChange={handleChangeFormData}
            value={name}
            icon={'EditIcon'}
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
          {isEdited && (
            <div className={s.formActions}>
              <button
                className={`${s.cancelBtn} text text_type_main-default`}
                type="reset"
                onClick={handleResetFormData}
              >
                Отмена
              </button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default ProfileForm;

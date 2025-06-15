import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@shared/services/hooks';
import { registerUser } from '@shared/services/reducers/userSlice';
import { useForm, useEditableInput, useUserRedirect } from '@shared/services/hooks';
import { FormFooter, FormTitle, PrimaryButton } from '../widgets';
import type { FormEventHandler, FC, ComponentProps } from 'react';
import styles from '../forms.module.css';

const navigationConfig: ComponentProps<typeof FormFooter>['data'] = [
  {
    linkText: 'Войти',
    to: '/login',
    text: 'Уже зарегистрированы?',
  },
];

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const { inputState, toggleEditMode } = useEditableInput();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(registerUser(formState));
  };

  useUserRedirect();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__content}>
        <FormTitle text='Регистрация' />
        <Input
          type='text'
          name='name'
          value={formState.name}
          onChange={handleInputChange}
          placeholder='Имя'
        />
        <Input
          type='email'
          name='email'
          value={formState.email}
          onChange={handleInputChange}
          placeholder='E-mail'
        />
        <Input
          type={inputState.type}
          value={formState.password}
          name='password'
          icon={inputState.icon}
          onIconClick={toggleEditMode}
          onChange={handleInputChange}
          placeholder='Пароль'
        />
        <PrimaryButton text='Зарегистрироваться' />
      </div>
      <FormFooter data={navigationConfig} />
    </form>
  );
};

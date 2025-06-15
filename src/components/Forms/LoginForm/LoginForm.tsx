import type { ComponentProps, FC, FormEventHandler } from 'react';
import { useAppDispatch } from '@shared/services/hooks';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormFooter, FormTitle, PrimaryButton } from '../widgets';
import { useForm, useEditableInput, useUserRedirect } from '@shared/services/hooks';
import { loginUser } from '@shared/services/reducers';
import styles from '../forms.module.css';

const navigationConfig: ComponentProps<typeof FormFooter>['data'] = [
  {
    text: 'Вы - новый пользователь?',
    linkText: 'Зарегистрироваться',
    to: '/register',
  },
  {
    text: 'Забыли пароль?',
    linkText: 'Восстановить пароль',
    to: '/forgot-password',
  },
];

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    email: '',
    password: '',
  });
  const { inputState, toggleEditMode } = useEditableInput();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(loginUser(formState));
  };

  useUserRedirect();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__content}>
        <FormTitle text='Вход' />
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
        <PrimaryButton text='Войти' />
      </div>
      <FormFooter data={navigationConfig} />
    </form>
  );
};

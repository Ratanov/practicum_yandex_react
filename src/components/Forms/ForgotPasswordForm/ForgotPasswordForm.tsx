import { FormEventHandler, FC, ComponentProps } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@shared/services/hooks';
import { forgotPassword } from '@shared/services/reducers/passwordSlice';
import { useForm } from '@shared/hooks';
import { FormFooter, FormTitle, PrimaryButton } from '../widgets';

import styles from '../forms.module.css';

const navigationLinks: ComponentProps<typeof FormFooter>['data'] = [
  {
    linkText: 'Войти',
    to: '/login',
    text: 'Вспомнили пароль?',
  },
];

export const ForgotPasswordForm: FC = () => {
  const location = useLocation();
  const { isMailSend } = useAppSelector((state) => state.password);
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({ email: '' });
  const redirectPath = location.pathname || '/';

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(formState));
  };

  if (isMailSend) {
    return <Navigate to='/reset-password' state={{ from: redirectPath }} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__content}>
        <FormTitle text='Восстановление пароля' />
        <Input
          type='text'
          name='email'
          value={formState.email}
          onChange={handleInputChange}
          placeholder='E-mail'
        />
        <PrimaryButton text='Восстановить' />
      </div>
      <FormFooter data={navigationLinks} />
    </form>
  );
};

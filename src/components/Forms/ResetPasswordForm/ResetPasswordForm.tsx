import type { FormEventHandler, FC, ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppDispatch } from '@shared/services/hooks';
import { resetPassword } from '@shared/services/reducers';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormFooter, FormTitle, PrimaryButton } from '../widgets';
import { useForm, useEditableInput } from '@shared/services/hooks';
import styles from '../forms.module.css';

const navigationConfig: ComponentProps<typeof FormFooter>['data'] = [
  {
    text: 'Вспомнили пароль?',
    to: '/login',
    linkText: 'Войти',
  },
];

export const ResetPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formState, handleInputChange } = useForm({ code: '', password: '' });
  const { inputState, toggleEditMode } = useEditableInput();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const resetData = {
      password: formState.password,
      token: formState.code
    };

    const resultAction = await dispatch(resetPassword(resetData));
    
    if (resetPassword.fulfilled.match(resultAction)) {
      navigate('/login', { replace: true });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__content}>
        <FormTitle text='Восстановление пароля' />
        <Input
          type={inputState.type}
          name='password'
          value={formState.password}
          icon={inputState.icon}
          onIconClick={toggleEditMode}
          onChange={handleInputChange}
          placeholder='Введите новый пароль'
        />
        <Input
          type='text'
          name='code'
          value={formState.code}
          onChange={handleInputChange}
          placeholder='Введите код из письма'
        />
        <PrimaryButton text='Сохранить' />
      </div>
      <FormFooter data={navigationConfig} />
    </form>
  );
};

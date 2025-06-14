import { useEffect, useState, FC, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Spinner } from '@components/index';
import { useForm, useEditableInput } from '@shared/hooks';
import { userApi } from '@shared/api';
import styles from '../forms.module.css';

export const ProfileForm: FC = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange, setFormState } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const { inputState, toggleEditMode } = useEditableInput();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getUser();

      if (response.success) {
        setFormState(response.user);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__content}>
        <Input
          type='text'
          value={formState.name}
          name='name'
          icon={'EditIcon'}
          onChange={(e) => inputState.isEditable && handleInputChange(e)}
          onIconClick={toggleEditMode}
          disabled={!inputState.isEditable}
          placeholder='Имя'
        />
        <Input
          type='email'
          name='email'
          value={formState.email}
          icon={'EditIcon'}
          onChange={(e) => inputState.isEditable && handleInputChange(e)}
          onIconClick={toggleEditMode}
          disabled={!inputState.isEditable}
          placeholder='E-mail'
        />
        <Input
          type={inputState.isEditable ? 'text' : 'password'}
          value={formState.password}
          name='password'
          icon={'EditIcon'}
          disabled={!inputState.isEditable}
          onIconClick={toggleEditMode}
          onChange={(e) => inputState.isEditable && handleInputChange(e)}
          placeholder='Пароль'
        />
      </div>
    </form>
  );
};

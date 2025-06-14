import { useState, useCallback } from 'react';
import type { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

interface IInputState {
  type: 'password' | 'text';
  icon: keyof TICons;
  isEditable: boolean;
}

interface IUseEditableInput {
  inputState: IInputState;
  toggleEditMode: () => void;
}

export const useEditableInput = (): IUseEditableInput => {
  const [inputState, setInputState] = useState<IInputState>({
    type: 'password',
    icon: 'ShowIcon',
    isEditable: false,
  });

  const toggleEditMode = useCallback(() => {
    setInputState((prevState) =>
      prevState.type === 'password'
        ? { type: 'text', icon: 'ShowIcon', isEditable: true }
        : { type: 'password', icon: 'HideIcon', isEditable: false }
    );
  }, []);

  return {
    inputState,
    toggleEditMode,
  };
};

import { useCallback, useState, ChangeEvent } from 'react';

interface UseFormReturn<T> {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formState: T;
  setFormState: (params: Partial<T>) => void;
}

export const useForm = <T extends Record<string, any>>(
  initialState: T
): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const updateFormState = useCallback((updates: Partial<T>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  }, []);

  return {
    handleInputChange,
    formState,
    setFormState: updateFormState,
  };
};

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '@shared/services/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useEditableInput } from './useEditableInput';
export { useForm } from './useForm';
export { useUserRedirect } from './useUserRedirect';

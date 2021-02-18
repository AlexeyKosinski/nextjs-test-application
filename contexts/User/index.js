import { createControllerContext } from '../../services/controller-context';
import { UserController } from './controller';

export const initialState = {
};

export const createUserContext = (state) =>
  createControllerContext(new UserController({ ...initialState, ...state }));

const { Provider, useControllerContext } = createUserContext();

export const UserProvider = Provider;

export const useUserContext = useControllerContext;

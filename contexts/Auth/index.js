import { createControllerContext } from '../../services/controller-context';
import { AuthController } from './controller';

export const initialState = {
  user: {},
};

export const createAuthContext = (state) =>
  createControllerContext(new AuthController({ ...initialState, ...state }));

const { Provider, useControllerContext } = createAuthContext();

export const AuthProvider = Provider;

export const useAuthContext = useControllerContext;

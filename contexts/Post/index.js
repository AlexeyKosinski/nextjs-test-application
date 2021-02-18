import { createControllerContext } from '../../services/controller-context';
import { PostController } from './controller';

export const initialState = {
};

export const createPostContext = (state) =>
  createControllerContext(new PostController({ ...initialState, ...state }));

const { Provider, useControllerContext } = createPostContext();

export const PostProvider = Provider;

export const usePostContext = useControllerContext;

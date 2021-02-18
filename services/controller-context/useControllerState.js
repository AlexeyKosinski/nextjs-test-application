import { useEffect, useState } from 'react';

export default function useControllerState(controller, errorHandler = undefined) {
  const [instance] = useState(() => (typeof controller === 'function' ? controller() : controller));
  const [state, dispatch] = useState(instance.valueOf());
  useEffect(() => instance.onDispatch(dispatch), [dispatch, instance]);
  useEffect(() => errorHandler && instance.onError && instance.onError(errorHandler), [errorHandler, instance]);

  return state;
}

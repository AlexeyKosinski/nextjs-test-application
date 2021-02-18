import React, { useContext, useEffect, useState } from 'react';

/**
 * Create Controller Context
 * @param {Controller} controller
 * @return {{Consumer: React.Consumer<Object>, withControllerContext: (function(*): function(*): *), useControllerContext: (function(): *), Provider: (function({value?: *, children: *}): *)}}
 */
export default function createControllerContext(controller) {
  const ControllerContext = React.createContext(controller.valueOf());

  const Provider = ({ value, errorHandler, children }) => {
    const [state, dispatch] = useState(() => controller.update(value).valueOf());
    useEffect(() => controller.onDispatch(dispatch), [dispatch]);
    useEffect(() => errorHandler && controller.onError && controller.onError(errorHandler), [errorHandler]);

    return <ControllerContext.Provider value={state}>{children}</ControllerContext.Provider>;
  };

  const Consumer = ControllerContext.Consumer;

  const useControllerContext = () => useContext(ControllerContext);

  const withControllerContext = (WrappedComponent) => {
    return (props) => {
      return <Consumer>{(controller) => <WrappedComponent controller={controller} {...props} />}</Consumer>;
    };
  };

  return {
    Provider,
    Consumer,
    useControllerContext,
    withControllerContext,
    controller,
  };
}

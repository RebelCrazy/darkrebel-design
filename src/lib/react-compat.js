import * as React from 'react-original';

const useEffectEvent = React.useEffectEvent || function useEffectEvent(fn) {
  const ref = React.useRef(fn);
  React.useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  return React.useCallback((...args) => {
    return ref.current(...args);
  }, []);
};

export * from 'react-original';
export { useEffectEvent };
export default React;

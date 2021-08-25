import React, {useReducer, useContext, createContext} from 'react';

const Store = createContext();

export const useStore = () => useContext(Store);

export const StoreProvider = ({children, initialState, reducer}) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  );
};

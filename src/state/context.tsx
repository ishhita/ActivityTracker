import React, {Dispatch, useContext, useMemo, useReducer} from 'react';
import {initialState, reducer} from './reducer';

const Context = React.createContext([] as (State | React.Dispatch<any>)[]);

const StateProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export function useAppState() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(`useAppState must be used within a StateProvider`);
  }
  return {
    state: context[0],
    dispatch: context[1],
  };
}

export default StateProvider;

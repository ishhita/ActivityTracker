import { Action, ActionMap, AllActions, State } from "../../types/types";

export const initialState: State = {
  email: '',
  activities: {},
  friends: {},
  proDate: 0
};


export function reducer<T extends AllActions>(state: State, action: Action<T>) {
  switch(action.type) {
    case 'SET_USER': {
      const {pk, sk, ...rest}  = action.payload;
      
    const bb = {
      ...state,
      ...rest,
      email: pk
    };

      return bb;
    };
    default: return state;
  }
}
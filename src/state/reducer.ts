
export const initialState: State = {
  user: {
    email: ''
  },
  activities: {}
};

export const reducer = (state: State, action: any) => {
  switch(action.type) {
    case 'dummy': return state;
    default: return state;
  }
}
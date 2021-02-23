import create from 'zustand';
import {User} from '../../types/models';
import {createUser, getUser} from '../api/API';

const initalState: User = {
  pk: '',
  sk: '',
  activities: {},
  proDate: 0,
};

interface UserState extends User {
  loading: false;
  setUser: (user: User) => void;
  markActivityFav: (activityId: string) => void;
  getUser: (pk: string) => Promise<UserState | {}>;
}

export const useProfile = create<UserState>((set, get) => ({
  ...initalState,
  async getUser(pk) {
    if (!get().pk) {
      const user = await getUser(pk);
      set(user);
      return user;
    }
    return get();
  },

  async setUser(user) {
    await createUser(user);
    set(user);
  },

  async markActivityFav(id) {
    const newUser: User = {
      pk: get().pk,
      sk: get().sk,
      activities: {...get().activities, [id]: []},
      proDate: get().proDate,
    };
    console.log(newUser);
    await createUser(newUser);

    set((state) => ({
      ...state,
      ...newUser,
    }));
  },
}));

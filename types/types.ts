import { Activity, User } from "./models"

export type State = {
  email: string;
  activities: {
    [id: string]: Activity & {logs: {duration: number; timestamp: string}[]}
  },
  friends: User['friends'],
  proDate: number
}

export type Action<T extends AllActions> = {type: T} & {payload: ActionMap[T]};
// todo model api responses here
export type ActionMap = {
  'SET_USER': User,
};

export type AllActions = keyof ActionMap ;

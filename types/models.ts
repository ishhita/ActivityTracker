export interface Activity {
  id: string;
  name: string;
}

export interface User {
  pk: string;
  sk: string;
  activities: {id: string; name: string}[];
  friends: {
    // each activity with array of user emails
    [activityId: string]: string[]
  }
  proDate: number;
}

export interface ActivityEvent {
  pk: string;
  // TODO: TS template string check here
  sk: string;
  duration: number
}
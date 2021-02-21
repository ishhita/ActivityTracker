type Activity = {
  name: string;
  id: string;
  logs: {duration: number; timestamp: string}[]
}

type State = {
  user: {
    email: string
  },
  activities: {
    [id: string]: Activity
  },
}

// todo model api responses here
type ActionMap = {

}
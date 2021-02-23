export interface Activity {
  id: string;
  name: string;
}

export interface User {
  pk: string;
  sk: string;
  activities: Record<string, string[]>;
  proDate: number;
}

export interface ActivityEvent {
  pk: string;
  // TODO: TS template string check here
  sk: string;
  duration: number;
}

export interface ActivityLogRequest {
  pk: string;
  sk: string;
}

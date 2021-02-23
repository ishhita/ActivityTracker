import {
  ActivityEvent,
  ActivityLogRequest,
  ActivityLogResponse,
  User,
} from '../../types/models';
import APICaller from './ApiCaller';

export const getUser = (email: string): Promise<User | {}> =>
  APICaller.get(`/user/${email}`);

export const createUpdateUser = (user: User) =>
  APICaller.put(`/user/${user.pk}`, user);

export const logActivity = (event: ActivityEvent) =>
  APICaller.post('/log/activity', event);

export const fetchActivityLog = ({
  pk,
  sk,
}: ActivityLogRequest): Promise<ActivityLogResponse> =>
  APICaller.get(`/activities/${pk}/activity_${sk}`);

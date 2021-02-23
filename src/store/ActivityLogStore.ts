import AsyncStorage from '@react-native-community/async-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';
import {ActivityEvent} from '../../types/models';
import {fetchActivityLog, logActivity} from '../api/API';

interface ActivityState {
  logs: Record<string, Record<string, ActivityEvent>>;
  getActivityLog: (pk: string, sk: string, activityId: string) => void;
  logActivity: (id: string, event: ActivityEvent) => void;
}

export const useActivityLogs = create<ActivityState>(
  persist<ActivityState>(
    (set) => ({
      logs: {},

      async logActivity(id, event) {
        await logActivity(event);
        set((state) => ({
          ...state,
          logs: {
            ...state.logs,
            [id]: {
              ...(state.logs[id] || {}),
              [event.sk]: event,
            },
          },
        }));
      },

      async getActivityLog(pk, sk, activityId) {
        const items = await fetchActivityLog({pk, sk});
        const map = items.data.Items.reduce((result, current) => {
          return {
            ...result,
            [current.sk]: current,
          };
        }, {});
        set((state) => ({
          ...state,
          logs: {
            ...state.logs,
            [activityId]: {
              ...(state.logs[activityId] || {}),
              ...map,
            },
          },
        }));
      },
    }),
    {
      name: 'activity-store',
      getStorage: () => AsyncStorage,
    },
  ),
);

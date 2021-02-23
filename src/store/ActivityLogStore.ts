import create from 'zustand';
import {ActivityEvent} from '../../types/models';
import {logActivity} from '../api/API';

interface ActivityState {
  logs: Record<string, ActivityEvent[]>;
  logActivity: (id: string, event: ActivityEvent) => void;
}

export const useActivityLogs = create<ActivityState>((set) => ({
  logs: {},
  async logActivity(id, event) {
    await logActivity(event);

    set((state) => ({
      ...state,
      logs: {
        ...state.logs,
        [id]: [event, ...(state.logs[id] || [])],
      },
    }));
  },
}));

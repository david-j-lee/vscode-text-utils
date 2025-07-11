import { Feature } from '../types/Feature';

export const date: Feature = {
  cursor: {
    nowIso8601() {
      return new Date().toISOString();
    },
    nowLocale() {
      return new Date().toLocaleString();
    },
    nowLocaleDate() {
      return new Date().toLocaleDateString();
    },
    nowLocaleTime() {
      return new Date().toLocaleTimeString();
    },
  },
};

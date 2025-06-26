import { Feature } from '../types/Feature';
import { v4 as uuidv4 } from 'uuid';

export const uuid: Feature = {
  cursor: {
    v4() {
      return uuidv4();
    },
  },
};

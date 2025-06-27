import { Feature } from '../types/Feature';

export const base64: Feature = {
  selection: {
    encode(selection) {
      return Buffer.from(selection, 'utf8').toString('base64');
    },
    decode(selection) {
      return Buffer.from(selection, 'base64').toString('utf8');
    },
  },
};

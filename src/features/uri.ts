import { Feature } from '../types/Feature';

export const uri: Feature = {
  selection: {
    encode(selection) {
      return encodeURIComponent(selection);
    },
    decode(selection) {
      return decodeURIComponent(selection);
    },
  },
};

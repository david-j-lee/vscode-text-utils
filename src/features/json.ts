import { Feature } from '../types/Feature';

export const json: Feature = {
  selection: {
    minify(selection) {
      return JSON.stringify(JSON.parse(selection));
    },
    escape(selection) {
      return JSON.stringify(JSON.stringify(selection));
    },
    unescape(selection) {
      return JSON.parse(selection);
    },
  },
};

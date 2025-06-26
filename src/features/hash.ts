import { Feature } from '../types/Feature';
import * as crypto from 'crypto';

export const hash: Feature = {
  selection: {
    md5(text) {
      return crypto.createHash('md5').update(text).digest('hex');
    },
    sha1(text) {
      return crypto.createHash('sha1').update(text).digest('hex');
    },
    sha256(text) {
      return crypto.createHash('sha256').update(text).digest('hex');
    },
  },
};

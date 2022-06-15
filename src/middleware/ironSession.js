import { ironSession } from 'iron-session/express';
import config from '../config/config';

let session = ironSession({
  cookieName: 'auth/session',
  password: config.ironPassword,
  cookieOptions: {
    secure: config.env === 'production',
  },
});

export default session;

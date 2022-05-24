import jwt from 'jsonwebtoken';

export const jwtSign = (payload, SECRET, option = {}) => jwt.sign(payload, SECRET, option);

export const jwtVerify = (token, SECRET) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return false;
  }
};

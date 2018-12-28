import jwt from 'jsonwebtoken';
import getJWT from './getJWT';

export default async (headers) => {
  try {
    await jwt.verify(getJWT(headers), process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

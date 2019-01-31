import jwt from 'jsonwebtoken';

export default async (token) => {
  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

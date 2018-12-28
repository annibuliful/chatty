import jwt from 'jsonwebtoken';
import getUser from '../../db/getData';
import createRoom from '../../db/createData';

const checkJWT = async (headers, done) => {
  try {
    const token = headers.authorization.replace('Bearer ', '');
    await jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    done.status(401).send({
      message: 'no token or invalid token',
    });
  }
};
export default {
  method: 'POST',
  url: '/room/create',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          roomId: {
            type: 'string',
          },
        },
      },
      401: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      500: {
        type: 'object',
        properites: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
  handler: async (req, res) => {
    await checkJWT(req.headers, res);
    res.send('sss');
  },
};

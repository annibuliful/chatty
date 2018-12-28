import jwt from 'jsonwebtoken';
import getUser from '../../db/getData';
import createRoom from '../../db/createData';
import getJWT from '../../utils/getJWT';

const checkJWT = async (headers) => {
  try {
    await jwt.verify(getJWT(headers), process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
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
      403: {
        type: 'object',
        properites: {
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
    if (checkJWT(req.headers)) {
      const { userId } = jwt.decode(getJWT(req.headers));
      const userInfo = await getUser('users')
        .filter({
          id: userId,
        })
        .limit(1);
      if (userInfo.length !== 0) {
        const room = await createRoom('rooms', {
          userId,
        });
        res.send({
          roomId: room.generated_keys,
        });
      } else {
        res.status(403).send({
          message: 'action forbidden',
        });
      }
    } else {
      res.status(401).send({
        message: 'no token or invalid token',
      });
    }
  },
};

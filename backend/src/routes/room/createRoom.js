import jwt from 'jsonwebtoken';
import getUser from '../../db/getData';
import createRoom from '../../db/createData';
import getJWT from '../../utils/getJWT';
import checkJWT from '../../utils/checkJWT';

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
    const checkToken = await checkJWT(req.headers);
    if (checkToken) {
      const { userId } = jwt.decode(getJWT(req.headers));
      const userInfo = await getUser('users')
        .filter({
          id: userId,
        })
        .limit(1);
      if (userInfo.length !== 0) {
        try {
          const room = await createRoom('rooms', {
            userId,
          });
          res.send({
            roomId: room.generated_keys,
          });
        } catch (e) {
          res.status(500).send({
            message: e,
          });
        }
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

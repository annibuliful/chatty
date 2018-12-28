import jwt from 'jsonwebtoken';
import getUser from '../../db/getData';
import createRoom from '../../db/createData';
import getJWT from '../../utils/getJWT';

export default {
  method: 'POST',
  url: '/room/create',
  schema: {
    body: {
      type: 'object',
      properties: {
        roomName: {
          type: 'string',
        },
      },
      required: ['roomName'],
    },
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
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
    const { userId } = jwt.decode(getJWT(req.headers));
    const userInfo = await getUser('users')
      .filter({
        id: userId,
      })
      .limit(1);
    if (userInfo.length !== 0) {
      try {
        const room = await createRoom('rooms', {
          roomName: req.body.roomName,
        });
        await createRoom('member_room', {
          roomId: room.generated_keys[0],
          userId,
        });
        res.send({
          roomId: room.generated_keys[0],
        });
      } catch (e) {
        res.status(500).send({
          message: e,
        });
      }
    } else {
      res.status(401).send({
        message: 'no token or invalid token',
      });
    }
  },
};

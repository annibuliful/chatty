import jwt from 'jsonwebtoken';
import getInfo from '../../db/getData';
import createRoom from '../../db/createData';
import getJWT from '../../utils/getJWT';
import checkJWT from '../../utils/checkJWT';

const checkRoomId = async (roomId) => {
  const roomInfo = await getInfo('rooms').get(roomId);
  if (roomInfo !== null) {
    return true;
  }
  return false;
};
export default {
  method: 'GET',
  url: '/room/:roomId/join',
  schema: {
    params: {
      type: 'object',
      properties: {
        roomId: { type: 'string' },
      },
      required: ['roomId'],
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
    const checkRoom = await checkRoomId(req.params.roomId);
    const { userId } = jwt.decode(getJWT(req.headers));
    const userInfo = await getInfo('users')
      .filter({
        id: userId,
      })
      .limit(1);
    if (userInfo.length !== 0 && checkRoom) {
      try {
        await createRoom('member_room', {
          roomId: req.params.roomId,
          userId,
        });
        res.send({
          roomId: req.params.roomId,
        });
      } catch (e) {
        res.status(500).send({
          message: e,
        });
      }
    } else {
      res.status(401).send({
        message: 'no token or invalid token or not found room id',
      });
    }
  },
};

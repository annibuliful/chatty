import getData from '../../db/getData';
import getJWT from '../../utils/getJWT';
import decodeJWT from '../../utils/decodeJWT';
import verifyJWT from '../../utils/verifyJWT';

export default {
  method: 'GET',
  url: '/chats/:roomId',
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
  },
  handler: async (req, res) => {
    const token = getJWT(req.headers);
    if (await verifyJWT(token)) {
      const { userId } = decodeJWT(token);
      const userInfo = await getData('member_room').filter({
        roomId: req.params.roomId,
        userId,
      });
      if (userInfo.length > 0) {
        const listMessage = await getData('chats').filter({
          roomId: req.params.roomId,
        });
        res.send(listMessage);
      } else {
        res.status(401).send({});
      }
    }
  },
};

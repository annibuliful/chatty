import getData from '../../db/getData';

export default {
  method: 'GET',
  url: '/rooms',
  schema: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
  handler: async (req, res) => {
    const listRooms = await getData('rooms');
    res.send(listRooms);
  },
};

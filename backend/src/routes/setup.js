import createTable from '../db/createTable';

export default {
  method: 'GET',
  url: '/setup',
  schema: {
    querystring: {
      username: { type: 'string' },
      password: { type: 'integer' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properites: {
          message: { type: 'string' },
        },
      },
    },
  },
  async handler(req, res) {
    try {
      await createTable('users');
      await createTable('chat');
      res.send('setup!!');
    } catch (e) {
      res.status(500).send(e);
    }
  },
};

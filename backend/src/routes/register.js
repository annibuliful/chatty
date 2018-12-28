import createData from '../db/createData';
import getData from '../db/getData';

export default {
  method: 'POST',
  url: '/register',
  schema: {
    querystring: {
      username: { type: 'string' },
      password: { type: 'string' },
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
    const { username, password } = req.body;
    if (username && password) {
      const checkUser = await getData('users').filter({
        username,
      });
      if (checkUser.length === 0) {
        const data = { username, password };
        await createData('users', data);
        res.send({ message: 'registered' });
      } else {
        res.status(400).send({ message: 'conflict username' });
      }
    } else {
      res.status(400).send({ message: 'please username or password' });
    }
  },
};

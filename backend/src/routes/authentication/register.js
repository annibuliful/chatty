import createData from '../../db/createData';
import getData from '../../db/getData';
import util from '../../utils/encrypt-decrypt';

export default {
  method: 'POST',
  url: '/register',
  schema: {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
    response: {
      200: {
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
      400: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
  async handler(req, res) {
    const { username, password } = req.body;
    const checkUser = await getData('users')
      .filter({
        username,
      })
      .limit(1);
    if (checkUser.length === 0) {
      const hashPassword = util.encrypt(password);
      const data = { username, password: hashPassword };
      await createData('users', data);
      res.send({ message: 'registered' });
    } else {
      res.status(400).send({ message: 'conflict username' });
    }
  },
};

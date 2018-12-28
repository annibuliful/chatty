import jwt from 'jsonwebtoken';
import utils from '../utils/encrypt-decrypt';
import getUser from '../db/getData';

export default {
  method: 'POST',
  url: '/login',
  schema: {
    querystring: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          jwt: { type: 'string' },
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
  handler: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const userInfo = await getUser('users')
        .filter({
          username,
        })
        .limit(1);
      if (userInfo.length === 1) {
        const check = utils.verify(password, userInfo[0].password);
        if (check) {
          const jwtToken = jwt.sign(
            {
              identification: userInfo[0].id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
          );
          res.send({
            jwt: jwtToken,
          });
        } else {
          res.status(401).send({
            message: 'Wrong Password',
          });
        }
      } else {
        res.status(401).send({
          message: 'Username not found',
        });
      }
    } else {
      res.status(400).send({
        message: 'please input username or password',
      });
    }
  },
};

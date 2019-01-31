import routes from './routes';
import webSocket from './websocket';
import logger from './logger';

const fastify = require('fastify')();
const helmet = require('fastify-helmet');
const compress = require('fastify-compress');
const cors = require('fastify-cors');
const cookie = require('fastify-cookie');
// dependencies
fastify.register(cookie, (err) => {
  if (err) throw err;
});
fastify.register(helmet, { hidePoweredBy: { setTo: 'Chatty' } });
fastify.register(compress, { global: false });
fastify.register(cors);
// Declare a route
routes.forEach((element) => {
  fastify.route(element);
});
// Run the server!
export default async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    logger.info('listening 3000');
    webSocket(fastify.server);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

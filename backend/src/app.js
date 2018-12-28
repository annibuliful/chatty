import routes from './routes';

const fastify = require('fastify')();
const helmet = require('fastify-helmet');
const compress = require('fastify-compress');
const cors = require('fastify-cors');
const httpError = require('fastify-sensible');
// dependencies
fastify.register(httpError);
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
    console.log('listening 3000');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

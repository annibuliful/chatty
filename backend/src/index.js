const fastify = require("fastify")();
const helmet = require("fastify-helmet");
const compress = require("fastify-compress");
const cors = require("fastify-cors");
const r = require("rethinkdbdash")({
  port: 28015,
  host: "db"
});
// dependencies

fastify.register(
  helmet,
  // Example of passing an option to x-powered-by middleware
  { hidePoweredBy: { setTo: "Chatty" } }
);
fastify.register(compress, { global: false });
fastify.register(cors);
// Declare a route
fastify.get("/setup", async (req, res) => {
  try {
    const response = await r.dbCreate("SitePoint").run();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
    console.log("listening 3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

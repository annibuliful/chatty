

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
const _default = {
  method: 'POST',
  url: '/register',
  schema: {
    querystring: {
      username: {
        type: 'string',
      },
      password: {
        type: 'integer',
      },
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
    },
  },
  handler: function handler(req, res) {
    console.log(req);
    res.send({
      hello: 'world',
    });
  },
};
exports.default = _default;

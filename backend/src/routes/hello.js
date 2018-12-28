export default {
  method: 'GET',
  url: '/',
  async handler(req, res) {
    res.send({ hello: 'world' });
  },
};

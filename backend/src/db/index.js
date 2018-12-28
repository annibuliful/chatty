import rethinkDB from 'rethinkdbdash';

export default rethinkDB({
  port: 28015,
  host: 'db',
  db: 'chatty',
});

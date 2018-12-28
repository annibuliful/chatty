import WebSocket from 'ws';

export default (server) => {
  const wss = new WebSocket.Server({ server });

  function broadcast(message) {
    wss.clients.forEach((client) => {
      console.log(client);
      if (client.room.indexOf(JSON.parse(message).room) > -1) {
        client.send(message);
      }
    });
  }
  wss.on('connection', (ws) => {
    ws.room = [];
    ws.send(JSON.stringify({ msg: 'user joined' }));
    console.log('connected');
    ws.on('message', (message) => {
      console.log('message: ', message);
      const messag = JSON.parse(message);
      console.log(messag);
      if (messag.join) {
        ws.room.push(messag.join);
        console.log(ws.room);
      }
      if (messag.room) {
        broadcast(message);
      }
      if (messag.msg) {
        console.log('message: ', messag.msg);
      }
    });

    ws.on('error', e => console.log(e));
    ws.on('close', e => console.log(`websocket closed${e}`));
  });
};

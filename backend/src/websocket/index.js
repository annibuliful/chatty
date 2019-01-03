import WebSocket from 'ws';
import controller from './controllerAction';

export default (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    ws.room = [];
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
        await controller(message, ws, wss);
      } catch (e) {
        ws.send('Invalid Data');
        console.error('Invalid Data');
        ws.close();
      }
    });

    ws.on('error', e => console.log(e));
    ws.on('close', e => console.log(`websocket closed${e}`));
  });
};

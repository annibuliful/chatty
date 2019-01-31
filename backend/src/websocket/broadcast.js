import createChat from '../db/createData';

export default async (message, wss) => {
  await wss.clients.forEach(async (client) => {
    if (client.room.indexOf(message.roomId) > -1) {
      try {
        await createChat('chats', message);
        client.send(JSON.stringify(message));
      } catch (e) {
        client.send('Service Unavailable');
        client.close();
      }
    }
  });
};

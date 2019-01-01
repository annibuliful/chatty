import createChat from '../db/createData';

export default async (message, wss) => {
  await wss.clients.forEach(async (client) => {
    if (client.room.indexOf(JSON.parse(message).roomId) > -1) {
      try {
        await createChat('chats', JSON.parse(message));
        client.send(message);
      } catch (e) {
        client.send('Service Unavailable');
        client.close();
      }
    }
  });
};

import broadcast from './broadcast';
import checkUser from './utils/checkJoinRoom';

export default async (data, ws, wss) => {
  if (data.action === 'join') {
    const checkUserPermission = await checkUser(data.roomId, data.userId);
    if (checkUserPermission) {
      ws.room.push(data.roomId);
    } else {
      ws.send('You cannot join this room');
      ws.close();
    }
  } else if (data.action === 'send') {
    await broadcast(data, wss);
  } else if (data.action === 'disconnect') {
    ws.close();
  } else {
    ws.send('No this action');
    ws.close();
  }
};

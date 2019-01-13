import registerRoute from './register';
import loginRoute from './login';
import setupRoute from './setup';
import createChatRoomRoute from './room/createRoom';
import joinChatRoomRoute from './room/joinRoom';
import listRoomsRoute from './room/listRoom';
import listChatMessage from './chat/getMessages';

export default [
  registerRoute,
  setupRoute,
  loginRoute,
  createChatRoomRoute,
  joinChatRoomRoute,
  listRoomsRoute,
  listChatMessage,
];

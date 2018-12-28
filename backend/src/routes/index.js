import registerRoute from './register';
import loginRoute from './login';
import setupRoute from './setup';
import createChatRoomRoute from './room/createRoom';
import joinChatRoomRoute from './room/joinRoom';

export default [registerRoute, setupRoute, loginRoute, createChatRoomRoute, joinChatRoomRoute];

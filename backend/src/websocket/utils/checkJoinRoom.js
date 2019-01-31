import getMemberRoom from '../../db/getData';

export default async (roomId, userId) => {
  const check = await getMemberRoom('member_room')
    .filter({
      roomId,
      userId,
    })
    .limit(1);
  if (check.length !== 0) {
    return true;
  }
  return false;
};

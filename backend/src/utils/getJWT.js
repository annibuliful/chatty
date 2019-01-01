export default (headers) => {
  if (headers.authorization && headers.authorization.indexOf('Bearer') > -1) {
    headers.authorization.replace('Bearer ', '');
  } else {
    throw new Error('no Auth Token');
  }
};

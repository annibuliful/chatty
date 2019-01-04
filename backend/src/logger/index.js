import logger from 'pino';

export const trace = (message) => {
  logger.info(message);
};
export const warn = (message) => {
  logger.warn(message);
};
export const error = (message) => {
  logger.error(message);
};
export default (message) => {
  logger.info(message);
};

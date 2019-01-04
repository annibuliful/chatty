import pino from 'pino';

const logger = pino({
  useLevelLabels: true,
  base: {},
});
const trace = (message) => {
  logger.info(message);
};
const warn = (message) => {
  logger.warn(message);
};
const error = (message) => {
  logger.error(message);
};

const info = (message) => {
  logger.info(message);
};

export default {
  info,
  error,
  warn,
  trace,
};

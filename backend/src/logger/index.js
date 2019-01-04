import pino from 'pino';
import pretty from 'pino-pretty';

const logger = pino({
  useLevelLabels: true,
  prettyPrint: {
    colorize: true,
    levelFirst: true,
  },
  prettifier: pretty,
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

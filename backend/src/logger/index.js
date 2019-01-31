import pino from 'pino';
import pretty from 'pino-pretty';

export default pino({
  useLevelLabels: true,
  prettyPrint: {
    colorize: true,
    levelFirst: true,
  },
  prettifier: pretty,
  base: {},
});

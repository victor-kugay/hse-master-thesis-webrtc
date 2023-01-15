import {isNodeEnvTest} from '../../constants';

export const LOGGER_TRANSPORT = !isNodeEnvTest ? {target: 'pino-pretty'} : undefined;
export const LOGGER_AUTO_LOGGING = !isNodeEnvTest;

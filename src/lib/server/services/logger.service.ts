import pino from 'pino';

const loggerInstance = pino(
    {},
    pino.transport({
        target: '@axiomhq/pino',
        options: {
            token: process.env.AXIOM_API_TOKEN,
            dataset: process.env.AXIOM_DATASET
        }
    })
);

export type Logger = {
    info: (message: string, data?: Record<string, unknown>) => void;
    error: (message: string, data?: Record<string, unknown>) => void;
    debug: (message: string, data?: Record<string, unknown>) => void;
    warn: (message: string, data?: Record<string, unknown>) => void;
};

export const logger: Logger = {
    info: (message, data) => loggerInstance.info(data || {}, message),
    error: (message, data) => loggerInstance.error(data || {}, message),
    debug: (message, data) => loggerInstance.debug(data || {}, message),
    warn: (message, data) => loggerInstance.warn(data || {}, message)
};
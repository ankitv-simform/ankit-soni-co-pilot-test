import morgan from 'morgan';
import { Request, Response } from 'express';

/**
 * Custom morgan token for log level based on status code
 * - [INFO]: 2xx and 3xx status codes
 * - [WARN]: 4xx status codes
 * - [ERROR]: 5xx status codes
 */
morgan.token('log-level', (req: Request, res: Response): string => {
  const status = res.statusCode;
  
  if (status >= 500) {
    return '[ERROR]';
  }
  
  if (status >= 400) {
    return '[WARN]';
  }
  
  return '[INFO]';
});

/**
 * Custom format: [LOG_LEVEL] [METHOD] /endpoint - Execution time: Xms
 */
const customFormat = ':log-level [:method] :url - Execution time: :response-time ms';

/**
 * Success logger middleware - logs requests with 2xx and 3xx status codes
 * Skips requests with 4xx and 5xx status codes
 */
export const successLogger = morgan(customFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400
});

/**
 * Error logger middleware - logs requests with 4xx and 5xx status codes
 * Skips requests with 2xx and 3xx status codes
 */
export const errorLogger = morgan(customFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400
});

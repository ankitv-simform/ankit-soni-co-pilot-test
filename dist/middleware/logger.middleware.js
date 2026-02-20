"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.successLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
/**
 * Custom morgan token for log level based on status code
 * - [INFO]: 2xx and 3xx status codes
 * - [WARN]: 4xx status codes
 * - [ERROR]: 5xx status codes
 */
morgan_1.default.token('log-level', (req, res) => {
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
exports.successLogger = (0, morgan_1.default)(customFormat, {
    skip: (req, res) => res.statusCode >= 400
});
/**
 * Error logger middleware - logs requests with 4xx and 5xx status codes
 * Skips requests with 2xx and 3xx status codes
 */
exports.errorLogger = (0, morgan_1.default)(customFormat, {
    skip: (req, res) => res.statusCode < 400
});

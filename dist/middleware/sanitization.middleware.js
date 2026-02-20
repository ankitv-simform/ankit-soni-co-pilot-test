"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeAll = exports.sanitizeParams = exports.sanitizeQuery = exports.sanitizeBody = void 0;
/**
 * Sanitizes string values by trimming whitespace and escaping HTML entities
 * to prevent XSS attacks and normalize inputs
 */
const sanitizeString = (value) => {
    if (typeof value === 'string') {
        // Trim whitespace
        let sanitized = value.trim();
        // Escape HTML entities to prevent XSS
        sanitized = sanitized
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
        // Collapse multiple spaces into single space
        sanitized = sanitized.replace(/\s+/g, ' ');
        return sanitized;
    }
    return value;
};
/**
 * Recursively sanitizes all string values in an object
 */
const sanitizeObject = (obj) => {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }
    if (typeof obj === 'object' && !(obj instanceof Date)) {
        const sanitized = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitized[key] = sanitizeObject(obj[key]);
            }
        }
        return sanitized;
    }
    if (typeof obj === 'string') {
        return sanitizeString(obj);
    }
    return obj;
};
/**
 * Express middleware to sanitize request body
 * Should be applied before validation middleware
 */
const sanitizeBody = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }
    next();
};
exports.sanitizeBody = sanitizeBody;
/**
 * Express middleware to sanitize request query parameters
 */
const sanitizeQuery = (req, res, next) => {
    if (req.query && typeof req.query === 'object') {
        req.query = sanitizeObject(req.query);
    }
    next();
};
exports.sanitizeQuery = sanitizeQuery;
/**
 * Express middleware to sanitize request params
 */
const sanitizeParams = (req, res, next) => {
    if (req.params && typeof req.params === 'object') {
        req.params = sanitizeObject(req.params);
    }
    next();
};
exports.sanitizeParams = sanitizeParams;
/**
 * Sanitize all request inputs (body, query, params)
 */
const sanitizeAll = (req, res, next) => {
    (0, exports.sanitizeBody)(req, res, () => {
        (0, exports.sanitizeQuery)(req, res, () => {
            (0, exports.sanitizeParams)(req, res, next);
        });
    });
};
exports.sanitizeAll = sanitizeAll;

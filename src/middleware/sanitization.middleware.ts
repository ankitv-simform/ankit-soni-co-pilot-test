import { Request, Response, NextFunction } from 'express';

/**
 * Sanitizes string values by trimming whitespace and escaping HTML entities
 * to prevent XSS attacks and normalize inputs
 */
const sanitizeString = (value: any): any => {
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
const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const sanitized: any = {};
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
export const sanitizeBody = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Express middleware to sanitize request query parameters
 */
export const sanitizeQuery = (req: Request, res: Response, next: NextFunction): void => {
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  next();
};

/**
 * Express middleware to sanitize request params
 */
export const sanitizeParams = (req: Request, res: Response, next: NextFunction): void => {
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }
  next();
};

/**
 * Sanitize all request inputs (body, query, params)
 */
export const sanitizeAll = (req: Request, res: Response, next: NextFunction): void => {
  sanitizeBody(req, res, () => {
    sanitizeQuery(req, res, () => {
      sanitizeParams(req, res, next);
    });
  });
};

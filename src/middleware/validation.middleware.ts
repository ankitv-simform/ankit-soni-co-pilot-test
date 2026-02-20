import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Interface for detailed validation error response
 */
interface ValidationError {
  field: string;
  message: string;
  constraint: string;
  value?: any;
}

/**
 * Formats Joi validation errors into detailed, user-friendly messages
 */
const formatValidationErrors = (error: Joi.ValidationError): ValidationError[] => {
  return error.details.map((detail) => {
    const field = detail.path.join('.');
    const message = detail.message;
    const constraint = detail.type;
    
    return {
      field,
      message,
      constraint,
      value: detail.context?.value,
    };
  });
};

/**
 * Validation target types
 */
export type ValidationType = 'body' | 'params' | 'query';

/**
 * Creates a validation middleware for Express routes
 * 
 * @param schema - Joi validation schema
 * @param target - Which part of the request to validate (body, params, query)
 * @returns Express middleware function
 * 
 * @example
 * router.post('/courses', validateRequest(createCourseSchema, 'body'), controller.createCourse);
 */
export const validateRequest = (
  schema: Joi.ObjectSchema | Joi.StringSchema,
  target: ValidationType = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Get the data to validate based on target
    const dataToValidate = req[target];
    
    // Validate with Joi
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false, // Get all validation errors, not just the first one
      stripUnknown: true, // Remove unknown properties
      convert: true, // Convert types (e.g., string to number)
    });
    
    if (error) {
      const validationErrors = formatValidationErrors(error);
      
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
        timestamp: new Date().toISOString(),
      });
      return;
    }
    
    // Replace the original data with validated and converted data
    req[target] = value;
    next();
  };
};

/**
 * Convenience function for validating request body
 */
export const validateBody = (schema: Joi.ObjectSchema) => {
  return validateRequest(schema, 'body');
};

/**
 * Convenience function for validating request params
 */
export const validateParams = (schema: Joi.ObjectSchema | Joi.StringSchema) => {
  return validateRequest(schema, 'params');
};

/**
 * Convenience function for validating request query
 */
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return validateRequest(schema, 'query');
};

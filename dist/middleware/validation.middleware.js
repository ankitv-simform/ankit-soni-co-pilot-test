"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = exports.validateRequest = void 0;
/**
 * Formats Joi validation errors into detailed, user-friendly messages
 */
const formatValidationErrors = (error) => {
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
 * Creates a validation middleware for Express routes
 *
 * @param schema - Joi validation schema
 * @param target - Which part of the request to validate (body, params, query)
 * @returns Express middleware function
 *
 * @example
 * router.post('/courses', validateRequest(createCourseSchema, 'body'), controller.createCourse);
 */
const validateRequest = (schema, target = 'body') => {
    return (req, res, next) => {
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
exports.validateRequest = validateRequest;
/**
 * Convenience function for validating request body
 */
const validateBody = (schema) => {
    return (0, exports.validateRequest)(schema, 'body');
};
exports.validateBody = validateBody;
/**
 * Convenience function for validating request params
 */
const validateParams = (schema) => {
    return (0, exports.validateRequest)(schema, 'params');
};
exports.validateParams = validateParams;
/**
 * Convenience function for validating request query
 */
const validateQuery = (schema) => {
    return (0, exports.validateRequest)(schema, 'query');
};
exports.validateQuery = validateQuery;

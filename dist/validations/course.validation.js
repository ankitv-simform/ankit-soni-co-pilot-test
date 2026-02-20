"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseIdSchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * Validation schema for creating a new course
 * All fields are required with custom validation rules
 */
exports.createCourseSchema = joi_1.default.object({
    title: joi_1.default.string()
        .required()
        .min(5)
        .max(200)
        .trim()
        .messages({
        'string.base': 'Title must be a text value',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 5 characters long',
        'string.max': 'Title cannot exceed 200 characters',
        'any.required': 'Title is required',
    }),
    description: joi_1.default.string()
        .required()
        .min(10)
        .max(1000)
        .trim()
        .messages({
        'string.base': 'Description must be a text value',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 1000 characters',
        'any.required': 'Description is required',
    }),
    instructor: joi_1.default.string()
        .required()
        .min(2)
        .max(100)
        .trim()
        .messages({
        'string.base': 'Instructor name must be a text value',
        'string.empty': 'Instructor name cannot be empty',
        'string.min': 'Instructor name must be at least 2 characters long',
        'string.max': 'Instructor name cannot exceed 100 characters',
        'any.required': 'Instructor name is required',
    }),
    duration: joi_1.default.number()
        .required()
        .min(0.5)
        .max(1000)
        .messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration must be at least 0.5 hours',
        'number.max': 'Duration cannot exceed 1000 hours',
        'any.required': 'Duration is required',
    }),
    price: joi_1.default.number()
        .required()
        .min(0)
        .precision(2)
        .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required',
    }),
    category: joi_1.default.string()
        .required()
        .min(2)
        .max(50)
        .trim()
        .messages({
        'string.base': 'Category must be a text value',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 2 characters long',
        'string.max': 'Category cannot exceed 50 characters',
        'any.required': 'Category is required',
    }),
    level: joi_1.default.string()
        .required()
        .valid('beginner', 'intermediate', 'advanced')
        .messages({
        'string.base': 'Level must be a text value',
        'any.only': 'Level must be one of: beginner, intermediate, or advanced',
        'any.required': 'Level is required',
    }),
    priority: joi_1.default.string()
        .optional()
        .valid('low', 'medium', 'high')
        .default('medium')
        .messages({
        'string.base': 'Priority must be a text value',
        'any.only': 'Priority must be one of: low, medium, or high',
    }),
    dueDate: joi_1.default.date()
        .optional()
        .iso()
        .greater('now')
        .messages({
        'date.base': 'Due date must be a valid date',
        'date.format': 'Due date must be in ISO 8601 format',
        'date.greater': 'Due date must be in the future',
    }),
    isCompleted: joi_1.default.boolean()
        .optional()
        .default(false)
        .messages({
        'boolean.base': 'isCompleted must be a boolean value',
    }),
});
/**
 * Validation schema for updating an existing course
 * All fields are optional but at least one field must be provided
 */
exports.updateCourseSchema = joi_1.default.object({
    title: joi_1.default.string()
        .optional()
        .min(5)
        .max(200)
        .trim()
        .messages({
        'string.base': 'Title must be a text value',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 5 characters long',
        'string.max': 'Title cannot exceed 200 characters',
    }),
    description: joi_1.default.string()
        .optional()
        .min(10)
        .max(1000)
        .trim()
        .messages({
        'string.base': 'Description must be a text value',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 1000 characters',
    }),
    instructor: joi_1.default.string()
        .optional()
        .min(2)
        .max(100)
        .trim()
        .messages({
        'string.base': 'Instructor name must be a text value',
        'string.empty': 'Instructor name cannot be empty',
        'string.min': 'Instructor name must be at least 2 characters long',
        'string.max': 'Instructor name cannot exceed 100 characters',
    }),
    duration: joi_1.default.number()
        .optional()
        .min(0.5)
        .max(1000)
        .messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration must be at least 0.5 hours',
        'number.max': 'Duration cannot exceed 1000 hours',
    }),
    price: joi_1.default.number()
        .optional()
        .min(0)
        .precision(2)
        .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
    }),
    category: joi_1.default.string()
        .optional()
        .min(2)
        .max(50)
        .trim()
        .messages({
        'string.base': 'Category must be a text value',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 2 characters long',
        'string.max': 'Category cannot exceed 50 characters',
    }),
    level: joi_1.default.string()
        .optional()
        .valid('beginner', 'intermediate', 'advanced')
        .messages({
        'string.base': 'Level must be a text value',
        'any.only': 'Level must be one of: beginner, intermediate, or advanced',
    }),
    priority: joi_1.default.string()
        .optional()
        .valid('low', 'medium', 'high')
        .messages({
        'string.base': 'Priority must be a text value',
        'any.only': 'Priority must be one of: low, medium, or high',
    }),
    dueDate: joi_1.default.date()
        .optional()
        .iso()
        .greater('now')
        .messages({
        'date.base': 'Due date must be a valid date',
        'date.format': 'Due date must be in ISO 8601 format',
        'date.greater': 'Due date must be in the future',
    }),
    isCompleted: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': 'isCompleted must be a boolean value',
    }),
})
    .min(1)
    .messages({
    'object.min': 'At least one field must be provided for update',
});
/**
 * Validation schema for course ID parameter
 */
exports.courseIdSchema = joi_1.default.string()
    .uuid()
    .required()
    .messages({
    'string.base': 'Course ID must be a text value',
    'string.guid': 'Course ID must be a valid UUID',
    'any.required': 'Course ID is required',
});

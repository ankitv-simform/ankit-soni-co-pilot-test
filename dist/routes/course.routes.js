"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const sanitization_middleware_1 = require("../middleware/sanitization.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const course_validation_1 = require("../validations/course.validation");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Public
 */
router.post('/', sanitization_middleware_1.sanitizeBody, (0, validation_middleware_1.validateBody)(course_validation_1.createCourseSchema), course_controller_1.default.createCourse.bind(course_controller_1.default));
/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/', course_controller_1.default.getAllCourses.bind(course_controller_1.default));
/**
 * @route   GET /api/courses/:id
 * @desc    Get a course by ID
 * @access  Public
 */
router.get('/:id', sanitization_middleware_1.sanitizeParams, (0, validation_middleware_1.validateParams)(course_validation_1.courseIdSchema), course_controller_1.default.getCourseById.bind(course_controller_1.default));
/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course by ID
 * @access  Public
 */
router.put('/:id', sanitization_middleware_1.sanitizeParams, (0, validation_middleware_1.validateParams)(course_validation_1.courseIdSchema), sanitization_middleware_1.sanitizeBody, (0, validation_middleware_1.validateBody)(course_validation_1.updateCourseSchema), course_controller_1.default.updateCourse.bind(course_controller_1.default));
/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course by ID
 * @access  Public
 */
router.delete('/:id', sanitization_middleware_1.sanitizeParams, (0, validation_middleware_1.validateParams)(course_validation_1.courseIdSchema), course_controller_1.default.deleteCourse.bind(course_controller_1.default));
exports.default = router;

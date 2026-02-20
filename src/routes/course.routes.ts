import { Router } from 'express';
import courseController from '../controllers/course.controller';
import { sanitizeBody, sanitizeParams } from '../middleware/sanitization.middleware';
import { validateBody, validateParams } from '../middleware/validation.middleware';
import {
  createCourseSchema,
  updateCourseSchema,
  courseIdSchema,
} from '../validations/course.validation';

const router = Router();

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Public
 */
router.post(
  '/',
  sanitizeBody,
  validateBody(createCourseSchema),
  courseController.createCourse.bind(courseController)
);

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/', courseController.getAllCourses.bind(courseController));

/**
 * @route   GET /api/courses/:id
 * @desc    Get a course by ID
 * @access  Public
 */
router.get(
  '/:id',
  sanitizeParams,
  validateParams(courseIdSchema),
  courseController.getCourseById.bind(courseController)
);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course by ID
 * @access  Public
 */
router.put(
  '/:id',
  sanitizeParams,
  validateParams(courseIdSchema),
  sanitizeBody,
  validateBody(updateCourseSchema),
  courseController.updateCourse.bind(courseController)
);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course by ID
 * @access  Public
 */
router.delete(
  '/:id',
  sanitizeParams,
  validateParams(courseIdSchema),
  courseController.deleteCourse.bind(courseController)
);

export default router;

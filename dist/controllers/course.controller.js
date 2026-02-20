"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_service_1 = __importDefault(require("../services/course.service"));
class CourseController {
    /**
     * Create a new course
     * POST /api/courses
     */
    async createCourse(req, res, next) {
        try {
            // Request body is already validated and sanitized by middleware
            const courseData = req.body;
            const course = course_service_1.default.createCourse(courseData);
            res.status(201).json({
                success: true,
                message: 'Course created successfully',
                data: course,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get all courses
     * GET /api/courses
     */
    async getAllCourses(req, res, next) {
        try {
            const courses = course_service_1.default.getAllCourses();
            res.status(200).json({
                success: true,
                message: 'Courses retrieved successfully',
                data: courses,
                count: courses.length,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get a course by ID
     * GET /api/courses/:id
     */
    async getCourseById(req, res, next) {
        try {
            // ID is already validated by middleware
            const { id } = req.params;
            const course = course_service_1.default.getCourseById(id);
            if (!course) {
                res.status(404).json({
                    success: false,
                    message: 'Course not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Course retrieved successfully',
                data: course,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update a course by ID
     * PUT /api/courses/:id
     */
    async updateCourse(req, res, next) {
        try {
            // ID and body are already validated and sanitized by middleware
            const { id } = req.params;
            const updateData = req.body;
            const updatedCourse = course_service_1.default.updateCourse(id, updateData);
            if (!updatedCourse) {
                res.status(404).json({
                    success: false,
                    message: 'Course not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                data: updatedCourse,
            });
        }
        catch (error) {
            if (error.message === 'Cannot modify a completed course') {
                res.status(403).json({
                    success: false,
                    message: 'Cannot modify a completed course',
                });
                return;
            }
            next(error);
        }
    }
    /**
     * Delete a course by ID
     * DELETE /api/courses/:id
     */
    async deleteCourse(req, res, next) {
        try {
            // ID is already validated by middleware
            const { id } = req.params;
            const deleted = course_service_1.default.deleteCourse(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Course not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Course deleted successfully',
            });
        }
        catch (error) {
            if (error.message === 'Cannot delete a completed course') {
                res.status(403).json({
                    success: false,
                    message: 'Cannot delete a completed course',
                });
                return;
            }
            next(error);
        }
    }
}
exports.CourseController = CourseController;
exports.default = new CourseController();

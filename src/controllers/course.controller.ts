import { Request, Response, NextFunction } from 'express';
import courseService from '../services/course.service';
import { CreateCourseDto, UpdateCourseDto } from '../models/course.model';

export class CourseController {
  /**
   * Create a new course
   * POST /api/courses
   */
  async createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Request body is already validated and sanitized by middleware
      const courseData: CreateCourseDto = req.body;
      const course = courseService.createCourse(courseData);

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all courses
   * GET /api/courses
   */
  async getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = courseService.getAllCourses();

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: courses,
        count: courses.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a course by ID
   * GET /api/courses/:id
   */
  async getCourseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // ID is already validated by middleware
      const { id } = req.params;
      const course = courseService.getCourseById(id);

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
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a course by ID
   * PUT /api/courses/:id
   */
  async updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // ID and body are already validated and sanitized by middleware
      const { id } = req.params;
      const updateData: UpdateCourseDto = req.body;
      const updatedCourse = courseService.updateCourse(id, updateData);

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
    } catch (error: any) {
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
  async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // ID is already validated by middleware
      const { id } = req.params;
      const deleted = courseService.deleteCourse(id);

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
    } catch (error: any) {
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

export default new CourseController();

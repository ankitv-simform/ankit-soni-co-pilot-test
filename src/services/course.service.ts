import { v4 as uuidv4 } from 'uuid';
import { Course, CreateCourseDto, UpdateCourseDto } from '../models/course.model';
import { StorageService } from './storage.service';

class CourseService {
  private storage: StorageService<Course>;

  constructor() {
    this.storage = new StorageService<Course>('courses.json');
  }

  createCourse(courseData: CreateCourseDto): Course {
    const course: Course = {
      id: uuidv4(),
      ...courseData,
      priority: courseData.priority || 'medium',
      isCompleted: courseData.isCompleted || false,
      completedAt: courseData.isCompleted ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.storage.create(course.id, course);
  }

  getAllCourses(): Course[] {
    const courses = this.storage.findAll();
    
    // Sort courses by priority and due date
    return courses.sort((a, b) => {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      // Check if courses are high priority with due date within 7 days
      const aIsUrgent = a.priority === 'high' && a.dueDate && new Date(a.dueDate) <= sevenDaysFromNow;
      const bIsUrgent = b.priority === 'high' && b.dueDate && new Date(b.dueDate) <= sevenDaysFromNow;
      
      // Urgent courses come first
      if (aIsUrgent && !bIsUrgent) return -1;
      if (!aIsUrgent && bIsUrgent) return 1;
      
      // If both urgent or both not urgent, sort by priority level
      const priorityOrder = { high: 3, medium: 2, low: 1, undefined: 0 };
      const aPriority = priorityOrder[a.priority || 'undefined' as keyof typeof priorityOrder];
      const bPriority = priorityOrder[b.priority || 'undefined' as keyof typeof priorityOrder];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority; // Higher priority first
      }
      
      // If same priority, sort by due date (soonest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      // Courses with due dates come before those without
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // If no due dates, maintain creation order
      return 0;
    });
  }

  getCourseById(id: string): Course | undefined {
    return this.storage.findById(id);
  }

  updateCourse(id: string, updateData: UpdateCourseDto): Course | undefined {
    const existingCourse = this.storage.findById(id);
    
    if (!existingCourse) {
      return undefined;
    }

    // Prevent modification of completed courses
    if (existingCourse.isCompleted && updateData.isCompleted !== false) {
      throw new Error('Cannot modify a completed course');
    }

    // Set completedAt when marking course as complete
    const completedAt = updateData.isCompleted && !existingCourse.isCompleted 
      ? new Date() 
      : existingCourse.completedAt;

    // Clear completedAt if marking as incomplete
    const finalCompletedAt = updateData.isCompleted === false ? undefined : completedAt;

    const updatedCourse: Course = {
      ...existingCourse,
      ...updateData,
      completedAt: finalCompletedAt,
      updatedAt: new Date(),
    };

    return this.storage.update(id, updatedCourse);
  }

  deleteCourse(id: string): boolean {
    const existingCourse = this.storage.findById(id);
    
    if (existingCourse && existingCourse.isCompleted) {
      throw new Error('Cannot delete a completed course');
    }

    return this.storage.delete(id);
  }

  courseExists(id: string): boolean {
    return this.storage.exists(id);
  }
}

export default new CourseService();

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  priority?: 'low' | 'medium' | 'high'; // course priority level (defaults to 'medium')
  dueDate?: Date; // optional due date for course completion
  isCompleted?: boolean; // marks if course is completed
  completedAt?: Date; // timestamp when course was completed
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  isCompleted?: boolean;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  instructor?: string;
  duration?: number;
  price?: number;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  isCompleted?: boolean;
}

import express, { Application } from 'express';
import healthRoutes from './routes/health.routes';
import courseRoutes from './routes/course.routes';
import { errorHandler } from './middleware/errorHandler';
import { successLogger, errorLogger } from './middleware/logger.middleware';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(successLogger);
app.use(errorLogger);

// Routes
app.use('/', healthRoutes);
app.use('/api/courses', courseRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;

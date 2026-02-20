"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_middleware_1 = require("./middleware/logger.middleware");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Logging middleware
app.use(logger_middleware_1.successLogger);
app.use(logger_middleware_1.errorLogger);
// Routes
app.use('/', health_routes_1.default);
app.use('/api/courses', course_routes_1.default);
// Error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
exports.default = app;

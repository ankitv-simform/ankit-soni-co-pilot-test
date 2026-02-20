# Course Management API

## Overview

A RESTful API for managing courses built with Node.js, Express.js, TypeScript, and Joi validation. Data is persisted in file-based storage for easy deployment and testing.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [Request/Response Examples](#requestresponse-examples)
7. [Validation Rules](#validation-rules)
8. [File-Based Storage](#file-based-storage)

---

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete courses
- ✅ **Data Validation**: Joi validator for request validation
- ✅ **File-Based Storage**: Persistent in-memory storage using JSON files
- ✅ **TypeScript**: Type-safe code with interfaces and DTOs
- ✅ **Error Handling**: Centralized error handling middleware
- ✅ **RESTful Design**: Standard HTTP methods and status codes

---

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Joi
- **ID Generation**: UUID v4
- **Storage**: File-based JSON storage

---

## Project Structure

```
backend/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   ├── controllers/
│   │   ├── course.controller.ts        # Course request handlers
│   │   └── health.controller.ts        # Health check controller
│   ├── models/
│   │   └── course.model.ts            # Course interface & DTOs
│   ├── routes/
│   │   ├── course.routes.ts           # Course route definitions
│   │   └── health.routes.ts           # Health check routes
│   ├── services/
│   │   ├── course.service.ts          # Course business logic
│   │   └── storage.service.ts         # Generic file storage service
│   └── middleware/
│       └── errorHandler.ts            # Error handling middleware
├── data/
│   └── courses.json                   # Course data storage (auto-generated)
├── package.json
├── tsconfig.json
└── AGENTS.md                          # This file
```

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

The server will start on `http://localhost:3000` by default.

---

## API Endpoints

### Base URL: `/api/courses`

| Method | Endpoint          | Description            | Auth Required |
|--------|-------------------|------------------------|---------------|
| POST   | `/api/courses`    | Create a new course    | No            |
| GET    | `/api/courses`    | Get all courses        | No            |
| GET    | `/api/courses/:id`| Get course by ID       | No            |
| PUT    | `/api/courses/:id`| Update course by ID    | No            |
| DELETE | `/api/courses/:id`| Delete course by ID    | No            |

---

## Request/Response Examples

### 1. Create a Course

**Request**:
```http
POST /api/courses
Content-Type: application/json

{
  "title": "Complete Node.js Developer Course",
  "description": "Learn Node.js by building real-world applications with Node, Express, MongoDB, and more",
  "instructor": "John Doe",
  "duration": 40,
  "price": 99.99,
  "category": "Programming",
  "level": "intermediate"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Complete Node.js Developer Course",
    "description": "Learn Node.js by building real-world applications with Node, Express, MongoDB, and more",
    "instructor": "John Doe",
    "duration": 40,
    "price": 99.99,
    "category": "Programming",
    "level": "intermediate",
    "createdAt": "2026-02-20T10:30:00.000Z",
    "updatedAt": "2026-02-20T10:30:00.000Z"
  }
}
```

---

### 2. Get All Courses

**Request**:
```http
GET /api/courses
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Complete Node.js Developer Course",
      "description": "Learn Node.js by building real-world applications",
      "instructor": "John Doe",
      "duration": 40,
      "price": 99.99,
      "category": "Programming",
      "level": "intermediate",
      "createdAt": "2026-02-20T10:30:00.000Z",
      "updatedAt": "2026-02-20T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 3. Get Course by ID

**Request**:
```http
GET /api/courses/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Complete Node.js Developer Course",
    "description": "Learn Node.js by building real-world applications",
    "instructor": "John Doe",
    "duration": 40,
    "price": 99.99,
    "category": "Programming",
    "level": "intermediate",
    "createdAt": "2026-02-20T10:30:00.000Z",
    "updatedAt": "2026-02-20T10:30:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Course not found"
}
```

---

### 4. Update Course

**Request**:
```http
PUT /api/courses/a1b2c3d4-e5f6-7890-abcd-ef1234567890
Content-Type: application/json

{
  "price": 79.99,
  "level": "advanced"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Complete Node.js Developer Course",
    "description": "Learn Node.js by building real-world applications",
    "instructor": "John Doe",
    "duration": 40,
    "price": 79.99,
    "category": "Programming",
    "level": "advanced",
    "createdAt": "2026-02-20T10:30:00.000Z",
    "updatedAt": "2026-02-20T10:45:00.000Z"
  }
}
```

---

### 5. Delete Course

**Request**:
```http
DELETE /api/courses/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Course not found"
}
```

---

## Validation Rules

### Create Course (All fields required)

| Field        | Type   | Validation Rules                          |
|--------------|--------|-------------------------------------------|
| title        | string | Required, 3-200 characters               |
| description  | string | Required, 10-1000 characters             |
| instructor   | string | Required, 2-100 characters               |
| duration     | number | Required, 0.5-1000 hours                 |
| price        | number | Required, minimum 0                       |
| category     | string | Required, 2-50 characters                |
| level        | string | Required, one of: beginner, intermediate, advanced |

### Update Course (At least one field required)

| Field        | Type   | Validation Rules                          |
|--------------|--------|-------------------------------------------|
| title        | string | Optional, 3-200 characters               |
| description  | string | Optional, 10-1000 characters             |
| instructor   | string | Optional, 2-100 characters               |
| duration     | number | Optional, 0.5-1000 hours                 |
| price        | number | Optional, minimum 0                       |
| category     | string | Optional, 2-50 characters                |
| level        | string | Optional, one of: beginner, intermediate, advanced |

### Course ID

- Must be a valid UUID v4 format
- Validated on GET, PUT, and DELETE operations

---

## File-Based Storage

### Storage Mechanism

The application uses a generic `StorageService` class that provides file-based persistence:

- **Location**: `data/courses.json`
- **Format**: JSON
- **Operations**: Automatically synced to file on create, update, and delete operations
- **In-Memory**: Data is loaded into a `Map` for fast access
- **Persistence**: Changes are immediately written to the JSON file

### Storage Service Features

```typescript
class StorageService<T> {
  create(id: string, item: T): T
  findAll(): T[]
  findById(id: string): T | undefined
  update(id: string, item: T): T | undefined
  delete(id: string): boolean
  exists(id: string): boolean
}
```

### Data Directory

- The `data/` directory is automatically created on first run
- `courses.json` file is auto-generated when the first course is created
- Data persists between server restarts

---

## Error Handling

### Validation Errors (400 Bad Request)

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"title\" is required",
    "\"price\" must be a number"
  ]
}
```

### Invalid ID Format (400 Bad Request)

```json
{
  "success": false,
  "message": "Invalid course ID format"
}
```

### Resource Not Found (404 Not Found)

```json
{
  "success": false,
  "message": "Course not found"
}
```

### Server Errors (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing the API

### Using cURL

```bash
# Create a course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Masterclass",
    "description": "Learn React from scratch with hands-on projects",
    "instructor": "Jane Smith",
    "duration": 30,
    "price": 89.99,
    "category": "Web Development",
    "level": "beginner"
  }'

# Get all courses
curl http://localhost:3000/api/courses

# Get a specific course
curl http://localhost:3000/api/courses/{course-id}

# Update a course
curl -X PUT http://localhost:3000/api/courses/{course-id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 69.99
  }'

# Delete a course
curl -X DELETE http://localhost:3000/api/courses/{course-id}
```

### Using Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Use the request examples above for testing

---

## Development Notes

### Key Design Decisions

1. **Generic Storage Service**: Reusable across different entities
2. **DTO Pattern**: Separate interfaces for create and update operations
3. **Joi Validation**: Schema-based validation at the controller level
4. **UUID v4**: Guaranteed unique IDs for courses
5. **TypeScript**: Strong typing for better code quality and IDE support

### Future Enhancements

- [ ] Add pagination for GET all courses
- [ ] Implement filtering and search
- [ ] Add authentication and authorization
- [ ] Implement rate limiting
- [ ] Add logging with Winston or Pino
- [ ] Migrate to a database (MongoDB, PostgreSQL)
- [ ] Add unit and integration tests
- [ ] API documentation with Swagger/OpenAPI

---

## License

This project is for educational purposes.

---

## Author

Created as part of the backend developer evaluation test.

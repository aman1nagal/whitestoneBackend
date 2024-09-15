# Task Management Application

## Overview

This task management application allows users to create, update, and delete tasks in real time. It supports collaborative editing of tasks, with changes reflected instantly across all connected clients.

## Backend

The backend is built with Node.js, Express, MongoDB, and Socket.io.

### Features

1. **API Design**:
   - **GET /tasks** - Retrieve a list of tasks.
   - **POST /tasks** - Create a new task.
   - **PUT /tasks/:id** - Update an existing task.
   - **DELETE /tasks/:id** - Delete a task.

2. **Real-time Updates**:
   - WebSocket support using Socket.io to push real-time updates to clients when tasks are created, updated, or deleted.

3. **Database**:
   - MongoDB is used to store task data.
   - Schema for tasks:
     - `title` (String)
     - `description` (String)
     - `status` (String, e.g., "pending", "completed")
     - `timestamp` (Date)
   - Indexing implemented for efficient querying.

4. **Authentication**:
   - User authentication is implemented using JWT.
   - Users can sign up, log in, and manage their own tasks.

5. **Error Handling & Validation**:
   - Robust error handling.
   - Request validation using `express-validator`.

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/task-management-app.git](https://github.com/aman1nagal/whitestoneBackend)
   cd whitestoneBackend
   npm i
   npm run dev

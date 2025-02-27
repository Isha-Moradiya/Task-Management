# Task Management Application

This is a full-stack task management application built using Express.js, React.js, JWT, bcryptjs, CORS, Toastify, Slugify, Context API. It provides user authentication functionality and allows users to manage tasks efficiently.

## Features
- User authentication (Register, Login, Logout)
- JWT-based authentication
- Password hashing using bcryptjs
- Task creation, updating, and deletion
- Task slug generation using Slugify
- Notifications using React-Toastify
- Secure API with CORS enabled

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, React-Toastify
- **Authentication:** JSON Web Token (JWT), bcryptjs
- **Other Dependencies:** CORS, Slugify

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the backend root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Routes

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user and get token
- **GET** `/api/auth/logout` - Logout user

### Task Management
- **POST** `/api/tasks` - Create a new task
- **GET** `/api/tasks` - Get all tasks
- **GET** `/api/tasks/:id` - Get a single task
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

## Usage
1. Register a new user.
2. Log in to receive a JWT token.
3. Use the token to access protected task routes.
4. Manage tasks through the frontend UI.

## License
This project is open-source and available under the MIT License.


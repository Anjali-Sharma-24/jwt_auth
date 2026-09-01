# JWT Authentication & Authorization API

A backend authentication system built with **Node.js, Express.js, MongoDB, Mongoose, JWT, and bcryptjs**.

This project implements secure user authentication and role-based authorization, allowing users to register, log in, receive JWT tokens, and access protected resources based on their assigned roles.

---

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcryptjs
* Protected API routes
* Role-based authorization
* User, Moderator, and Admin roles
* MongoDB database integration
* Mongoose-based data modeling
* Express.js REST API
* Authentication middleware
* CORS support

---

## Tech Stack

```text
Backend      → Node.js + Express.js
Database     → MongoDB
ODM          → Mongoose
Authentication → JSON Web Token (JWT)
Security     → bcryptjs
API Testing  → Postman
```

---

## Project Architecture

```text
Client / Postman
       │
       ▼
Express.js API
       │
       ├───────────────┐
       ▼               ▼
Authentication      Protected
   Routes             Routes
       │               │
       ▼               ▼
Controllers       JWT Middleware
       │               │
       │               ▼
       │        Role Authorization
       │               │
       └───────┬───────┘
               ▼
          Mongoose Models
               │
               ▼
            MongoDB
```

The application follows a modular structure where routes handle API endpoints, controllers handle business logic, middleware manages authentication and authorization, and models interact with MongoDB.

---

## Project Structure

```text
node-js-jwt-auth-mongodb-master/
│
├── app/
│   ├── config/
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── authJwt.js
│   │   └── verifySignUp.js
│   │
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   └── role.model.js
│   │
│   └── routes/
│       ├── auth.routes.js
│       └── user.routes.js
│
├── server.js
├── package.json
└── README.md
```

---

## How Authentication Works

### 1. Registration

A new user submits their username, email, password, and optional role information.

The server validates the request, hashes the password using bcryptjs, and stores the user in MongoDB.

### 2. Login

The user provides their credentials.

The server:

1. Finds the user in MongoDB.
2. Verifies the password.
3. Generates a signed JWT.
4. Returns the token to the client.

### 3. Accessing Protected Routes

The client sends the JWT with subsequent requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to protected resources.

### 4. Role Authorization

After authentication, the user's role is checked to determine whether they are allowed to access a particular resource.

```text
User
 └── User-level resources

Moderator
 ├── User-level resources
 └── Moderator resources

Admin
 ├── User-level resources
 ├── Moderator resources
 └── Admin resources
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Purpose                            |
| ------ | ------------------ | ---------------------------------- |
| `POST` | `/api/auth/signup` | Register a new user                |
| `POST` | `/api/auth/signin` | Authenticate user and generate JWT |

### Protected Resources

| Method | Endpoint          | Access              |
| ------ | ----------------- | ------------------- |
| `GET`  | `/api/test/all`   | Public              |
| `GET`  | `/api/test/user`  | Authenticated users |
| `GET`  | `/api/test/mod`   | Moderator           |
| `GET`  | `/api/test/admin` | Admin               |

---

## API Examples

### Register

```http
POST /api/auth/signup
Content-Type: application/json
```

```json
{
  "username": "anjali",
  "email": "anjali@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/signin
Content-Type: application/json
```

```json
{
  "username": "anjali",
  "password": "password123"
}
```

The response contains an authentication token:

```json
{
  "accessToken": "<JWT_TOKEN>"
}
```

### Access Protected Route

```http
GET /api/test/user
Authorization: Bearer <JWT_TOKEN>
```

---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Anjali-Sharma-24/jwt_auth.git
```

### Navigate to the project

```bash
cd jwt_auth/node-js-jwt-auth-mongodb-master
```

### Install dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is running locally on the configured host and port.

### Start the server

```bash
node server.js
```

The API will be available at:

```text
http://localhost:8080
```

---

## Security

The project uses:

* **bcryptjs** for password hashing
* **JWT** for stateless authentication
* Authentication middleware for protected routes
* Role-based middleware for access control

For production deployment, sensitive configuration such as database credentials and JWT secrets should be moved to environment variables.

---

## Future Improvements

* [ ] Environment variable configuration
* [ ] Refresh token implementation
* [ ] Password reset functionality
* [ ] Email verification
* [ ] Request validation
* [ ] Rate limiting
* [ ] Swagger/OpenAPI documentation
* [ ] Automated testing
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Cloud deployment

---

## What I Learned

Building this project helped me understand how authentication works at the backend level, including:

* Designing REST APIs with Express.js
* Connecting Node.js applications with MongoDB
* Modeling data using Mongoose
* Hashing and verifying passwords
* Creating and validating JWTs
* Protecting API endpoints with middleware
* Implementing role-based authorization
* Structuring a maintainable Node.js backend

---

## Author

**Anjali Sharma**

GitHub:
https://github.com/Anjali-Sharma-24

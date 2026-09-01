# JWT Authentication & Authorization API

A backend REST API implementing JWT-based authentication and role-based authorization using **Node.js, Express.js, MongoDB, Mongoose, and bcryptjs**.

This project provides user registration, authentication, JWT token generation, protected routes, and role-based access control for **User, Moderator, and Admin** roles.

---

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcryptjs
* Protected API routes
* Role-based authorization
* User, Moderator, and Admin roles
* MongoDB integration with Mongoose
* Environment-based configuration
* CORS support
* Modular backend architecture
* RESTful API endpoints

---

## Tech Stack

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| Node.js        | Backend runtime               |
| Express.js     | REST API framework            |
| MongoDB        | Database                      |
| Mongoose       | MongoDB ODM                   |
| JSON Web Token | Authentication                |
| bcryptjs       | Password hashing              |
| dotenv         | Environment configuration     |
| CORS           | Cross-origin request handling |

---

## Project Architecture

```text
Client / Postman
       |
       v
Express.js API
       |
       +-------------------+
       |                   |
       v                   v
Authentication        Protected
Routes                 Routes
       |                   |
       v                   v
Controllers          JWT Middleware
                           |
                           v
                    Role Authorization
                           |
                           v
                    Mongoose Models
                           |
                           v
                        MongoDB
```

The application follows a modular architecture:

* **Routes** define API endpoints.
* **Controllers** contain authentication and user-related logic.
* **Middleware** handles JWT authentication and role-based authorization.
* **Models** define MongoDB data structures using Mongoose.
* **Config** contains database and JWT configuration.
* **server.js** initializes the Express application and MongoDB connection.

---

## Project Structure

```text
jwt_auth/
|
+-- app/
|   +-- config/
|   |   +-- auth.config.js
|   |   +-- db.config.js
|   |
|   +-- controllers/
|   |   +-- auth.controller.js
|   |   +-- user.controller.js
|   |
|   +-- middlewares/
|   |   +-- authJwt.js
|   |   +-- index.js
|   |   +-- verifySignUp.js
|   |
|   +-- models/
|   |   +-- index.js
|   |   +-- role.model.js
|   |   +-- user.model.js
|   |
|   +-- routes/
|       +-- auth.routes.js
|       +-- user.routes.js
|
+-- .env.example
+-- .gitignore
+-- package.json
+-- package-lock.json
+-- README.md
+-- server.js
```

---

## Authentication Flow

### 1. User Registration

The client sends registration details to:

```http
POST /api/auth/signup
```

The server:

1. Validates the request.
2. Checks whether the username or email already exists.
3. Hashes the password using bcryptjs.
4. Creates the user in MongoDB.
5. Assigns the appropriate role.

### 2. User Login

The client sends login credentials to:

```http
POST /api/auth/signin
```

The server:

1. Finds the user in MongoDB.
2. Verifies the password.
3. Retrieves the user's roles.
4. Generates a signed JWT.
5. Returns the authentication information and access token.

Example response:

```json
{
  "id": "USER_ID",
  "username": "anjali",
  "email": "anjali@example.com",
  "roles": [
    "ROLE_USER"
  ],
  "accessToken": "<JWT_TOKEN>"
}
```

### 3. Accessing Protected Routes

The client sends the JWT in the HTTP Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to protected resources.

### 4. Role-Based Authorization

After authentication, the user's role is checked to determine whether they are authorized to access a particular resource.

The API supports three roles:

```text
User
|
+-- User-level resources

Moderator
|
+-- User-level resources
+-- Moderator resources

Admin
|
+-- User-level resources
+-- Moderator resources
+-- Admin resources
```

Authentication determines **who the user is**, while authorization determines **what the user is allowed to access**.

---

## API Endpoints

### Authentication Endpoints

| Method | Endpoint           | Description                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | `/api/auth/signup` | Register a new user                    |
| POST   | `/api/auth/signin` | Authenticate a user and generate a JWT |

### Protected Endpoints

| Method | Endpoint          | Access              |
| ------ | ----------------- | ------------------- |
| GET    | `/api/test/all`   | Public              |
| GET    | `/api/test/user`  | Authenticated users |
| GET    | `/api/test/mod`   | Moderator           |
| GET    | `/api/test/admin` | Admin               |

---

## API Examples

### Register a User

```http
POST /api/auth/signup
Content-Type: application/json
```

Request body:

```json
{
  "username": "anjali",
  "email": "anjali@example.com",
  "password": "Password123!"
}
```

Example response:

```json
{
  "message": "User was registered successfully!"
}
```

### Login

```http
POST /api/auth/signin
Content-Type: application/json
```

Request body:

```json
{
  "username": "anjali",
  "password": "Password123!"
}
```

Example response:

```json
{
  "id": "USER_ID",
  "username": "anjali",
  "email": "anjali@example.com",
  "roles": [
    "ROLE_USER"
  ],
  "accessToken": "<JWT_TOKEN>"
}
```

### Access a Protected Route

```http
GET /api/test/user
Authorization: Bearer <JWT_TOKEN>
```

Replace `<JWT_TOKEN>` with the access token returned from the signin endpoint.

---

## Environment Configuration

The application uses environment variables for configuration.

Create a `.env` file in the project root.

Example:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/jwt_auth
JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=24h
```

A template is provided in:

```text
.env.example
```

### Environment Variables

| Variable         | Description                | Example                              |
| ---------------- | -------------------------- | ------------------------------------ |
| `PORT`           | Port on which the API runs | `8080`                               |
| `MONGODB_URI`    | MongoDB connection string  | `mongodb://localhost:27017/jwt_auth` |
| `JWT_SECRET`     | Secret used to sign JWTs   | `your_secure_random_secret`          |
| `JWT_EXPIRES_IN` | JWT expiration duration    | `24h`                                |

> **Important:** Never commit your `.env` file to GitHub or expose your JWT secret publicly.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Anjali-Sharma-24/jwt_auth.git
```

### 2. Navigate to the Project

```bash
cd jwt_auth
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/jwt_auth
JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=24h
```

### 5. Start MongoDB

Make sure MongoDB is installed and running locally.

The default configuration uses:

```text
mongodb://localhost:27017/jwt_auth
```

### 6. Start the Application

```bash
npm start
```

The API will be available at:

```text
http://localhost:8080
```

---

## Testing the API

The API can be tested using:

* cURL
* Postman
* Thunder Client
* REST Client

### Test the Root Endpoint

```http
GET /
```

Example response:

```json
{
  "message": "Welcome to JWT Authentication API."
}
```

### Test Registration

PowerShell:

```powershell
curl.exe -X POST http://localhost:8080/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"username":"anjali","email":"anjali@example.com","password":"Password123!"}'
```

### Test Login

PowerShell:

```powershell
curl.exe -X POST http://localhost:8080/api/auth/signin `
  -H "Content-Type: application/json" `
  -d '{"username":"anjali","password":"Password123!"}'
```

The login response contains the JWT access token required for protected endpoints.

---

## Security

The application implements several security-related mechanisms:

* Password hashing with bcryptjs
* JWT-based stateless authentication
* Protected API routes
* Role-based authorization
* Environment variables for sensitive configuration
* CORS configuration
* Authentication middleware

For production deployment, additional security measures should be considered, including:

* Request validation
* Rate limiting
* Security headers
* Refresh-token rotation
* Centralized error handling
* Automated security testing
* HTTPS
* Secure secret management

---

## Database

The application uses **MongoDB** as its database and **Mongoose** as the Object Data Modeling (ODM) library.

The main collections/models include:

* `users`
* `roles`

When the application starts for the first time and the roles collection is empty, the following default roles are initialized:

```text
user
moderator
admin
```

---

## Current Status

The core JWT authentication and role-based authorization workflow is implemented and tested.

The following functionality has been verified:

* MongoDB connection
* Server startup
* User registration
* User login
* JWT generation
* Role assignment
* Root API endpoint
* Environment-based configuration
* Refactored project structure

---

## Future Improvements

The following improvements can be added in future versions:

* [ ] Request validation
* [ ] Centralized error handling
* [ ] Rate limiting
* [ ] Helmet security headers
* [ ] Automated API tests
* [ ] Swagger/OpenAPI documentation
* [ ] Postman collection
* [ ] GitHub Actions CI/CD
* [ ] Refresh-token implementation
* [ ] Password reset
* [ ] Email verification
* [ ] Docker support
* [ ] Cloud deployment

---

## What This Project Demonstrates

This project demonstrates practical backend development concepts, including:

* REST API development
* Node.js and Express.js
* MongoDB database integration
* Mongoose data modeling
* JWT authentication
* Role-based access control
* Password hashing
* Express middleware
* Authentication flows
* Environment-based configuration
* Modular project organization
* API testing

---

## Author

**Anjali Sharma**

GitHub:

https://github.com/Anjali-Sharma-24

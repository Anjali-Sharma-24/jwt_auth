# 🔐 JWT Authentication & Authorization API

A REST API implementing **JWT-based authentication and role-based authorization** using Node.js, Express.js, MongoDB, and Mongoose.

This project provides user registration, login, JWT token generation, protected routes, and role-based access control for User, Moderator, and Admin roles.

## 🚀 Features

* User registration and authentication
* JWT-based authentication
* Password hashing with bcryptjs
* Protected API routes
* Role-based authorization
* User, Moderator, and Admin roles
* MongoDB integration with Mongoose
* Environment-based configuration
* CORS support
* RESTful API structure

## 🛠️ Tech Stack

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

## 🏗️ Architecture

```text
Client / Postman
       │
       ▼
   Express.js
       │
       ▼
     Routes
       │
       ├───────────────┐
       ▼               ▼
 Authentication     Protected
    Routes            Routes
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

## 📁 Project Structure

```text
jwt_auth/
│
├── app/
│   ├── config/
│   │   ├── auth.config.js
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── authJwt.js
│   │   ├── index.js
│   │   └── verifySignUp.js
│   │
│   ├── models/
│   │   ├── index.js
│   │   ├── role.model.js
│   │   └── user.model.js
│   │
│   └── routes/
│       ├── auth.routes.js
│       └── user.routes.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## 🔄 Authentication Flow

### Registration

The client sends user registration details to the signup endpoint.

The server:

1. Validates the request.
2. Checks whether the user already exists.
3. Hashes the password using bcryptjs.
4. Stores the user in MongoDB.
5. Assigns the appropriate role.

### Login

The client sends valid credentials to the signin endpoint.

The server:

1. Finds the user.
2. Verifies the password.
3. Generates a signed JWT.
4. Returns the token to the client.

### Protected Requests

The client includes the JWT in the Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to protected resources.

## 🔐 Role-Based Authorization

The API supports three roles:

```text
User
 └── User-level protected resources

Moderator
 ├── User-level resources
 └── Moderator resources

Admin
 ├── User-level resources
 ├── Moderator resources
 └── Admin resources
```

Authentication verifies **who the user is**, while authorization determines **what the user is allowed to access**.

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/auth/signup` | Register a new user            |
| POST   | `/api/auth/signin` | Authenticate and receive a JWT |

### Protected Resources

| Method | Endpoint          | Access              |
| ------ | ----------------- | ------------------- |
| GET    | `/api/test/all`   | Public              |
| GET    | `/api/test/user`  | Authenticated users |
| GET    | `/api/test/mod`   | Moderator           |
| GET    | `/api/test/admin` | Admin               |

## ⚙️ Environment Configuration

Create a `.env` file in the project root:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/jwt_auth
JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=24h
```

A template is provided in `.env.example`.

**Never commit `.env` or expose your JWT secret publicly.**

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Anjali-Sharma-24/jwt_auth.git
```

Navigate to the project:

```bash
cd jwt_auth
```

Install dependencies:

```bash
npm install
```

Make sure MongoDB is running locally or provide a MongoDB Atlas connection string through `MONGODB_URI`.

Start the server:

```bash
npm start
```

The API will run on:

```text
http://localhost:8080
```

## 🧪 Testing the API

The API can be tested using tools such as:

* Postman
* Thunder Client
* REST Client
* cURL

Example signup request:

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

Example signin request:

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

The returned JWT can then be used to access protected endpoints.

## 🔒 Security

The application uses:

* bcryptjs for password hashing
* JWT for stateless authentication
* Environment variables for sensitive configuration
* Authentication middleware for protected resources
* Role-based middleware for authorization

For production use, additional measures such as rate limiting, request validation, security headers, refresh-token rotation, and automated security testing should be considered.

## 📌 Current Status

This project currently focuses on the core authentication and authorization workflow.

Planned improvements include:

* [ ] Request validation
* [ ] Centralized error handling
* [ ] Rate limiting
* [ ] Helmet security headers
* [ ] Automated API tests
* [ ] Swagger/OpenAPI documentation
* [ ] Postman collection
* [ ] GitHub Actions CI
* [ ] Refresh-token implementation
* [ ] Password reset
* [ ] Email verification
* [ ] Docker support

## 🎯 What This Project Demonstrates

This project demonstrates practical backend concepts including:

* REST API development
* JWT authentication
* Role-based access control
* Password hashing
* MongoDB data modeling
* Express middleware
* Authentication flows
* Environment-based configuration
* Modular Node.js project structure

## 👩‍💻 Author

**Anjali Sharma**

GitHub: [Anjali-Sharma-24](https://github.com/Anjali-Sharma-24)
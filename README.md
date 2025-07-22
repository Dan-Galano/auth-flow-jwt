# 🔐 JWT Authentication Project (MERN Stack)

A simple authentication system built using the MERN stack (MongoDB, Express, React, Node.js) and **JSON Web Tokens (JWT)**. It supports user signup, login, logout, and protected routes.

## 📁 Project Structure

```
JWT_PROJECT/
├── client/      # React frontend
└── server/      # Express backend with JWT authentication
```

---

## 🚀 Features

- User Signup, Login, Logout
- JWT-based authentication
- Protected routes (backend)
- React frontend with form handling
- Secure token storage using HTTP-only cookies or localStorage (depending on setup)
- Easily extensible for role-based auth, sessions, and user profiles

---

## 🛠️ Technologies Used

### Frontend
- React
- Axios
- React Router DOM

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt for password hashing
- dotenv for environment variables

---

## 🧪 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/Dan-Galano/auth-flow-jwt.git
cd jwt-auth-project
```

---

### 2. Setup Environment Variables

Create `.env` files for both folders (`client/.env` and `server/.env`):

#### `server/.env`
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173/
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### `client/.env`
```env
VITE_API_URL=http://localhost:5000
```

---

### 3. Install Dependencies

#### Backend
```
cd server
npm install
```

#### Frontend
```
cd client
npm install
```

---

### 4. Run the Application Locally

#### Start the backend
```
cd server
npm run dev
```

#### Start the frontend
```
cd client
npm start
```

Your app should now be running at `http://localhost:5173` (React) and `http://localhost:5000` (API).

---

## 🌐 Deployment Notes

- **Frontend**: Deploy `client/` to [Vercel](https://vercel.com/)
- **Backend**: Deploy `server/` to [Render](https://render.com/), [Railway](https://railway.app/), or similar
- Update the frontend `.env` file (`VITE_API_URL`) to point to the hosted backend API

---

## 🧾 Example API Routes

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/api/signup`    | Create a new user   |
| POST   | `/api/login`     | Authenticate user   |
| POST   | `/api/logout`    | Log out user        |
| GET    | `/api/protected` | Protected resource  |

---

## 🛡️ Security Notes

- Passwords are hashed using bcrypt before being stored.
- JWTs are signed and optionally stored in **HTTP-only cookies** for security.
- Make sure to keep `JWT_SECRET` and `.env` files out of version control.

---

## ✨ Author

Made by Dan Galano
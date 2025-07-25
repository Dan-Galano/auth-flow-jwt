# 🔐 JWT Authentication Project (MERN Stack)

A robust authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js) using **JSON Web Tokens (JWT)**. It supports secure login/signup, refresh tokens, reCAPTCHA validation, and protected routes with HTTP-only cookies.

Deployed on:
- 🌐 Frontend: [Vercel](https://vercel.com/)
- 🛠️ Backend: [Render](https://render.com/)

---

## 📁 Project Structure

```
JWT_PROJECT/
├── client/      # React frontend (Vercel)
└── server/      # Express backend (Render)
```

---

## 🚀 Features

- ✅ User Signup / Login / Logout
- 🛡️ JWT-based authentication
- 🔄 Refresh token handling
- 🤖 Google reCAPTCHA v3 validation
- 🔐 Protected routes via access token
- 🍪 Secure token storage using **HTTP-only cookies**
- ⚙️ Zustand for global auth state
- 🌍 Environment-aware (dev/production-ready)

---

## 🛠️ Technologies Used

### Frontend
- React
- Axios
- React Router DOM
- Zustand (global state management)
- Google reCAPTCHA v3

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt (password hashing)
- dotenv (env vars)
- cookie-parser

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Dan-Galano/auth-flow-jwt.git
cd auth-flow-jwt
```

---

### 2. Setup Environment Variables

#### `server/.env`

```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173/
MONGODB_URI=your_mongodb_uri
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
JWT_ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
```

> 🔐 Set `NODE_ENV=production` when deploying to Render

#### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

---

### 3. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

### 4. Run the App Locally

#### Start backend
```bash
cd server
npm run start:dev
```

#### Start frontend
```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000`

---

## 🌐 Deployment Notes

- **Frontend**: Deploy `/client` to **Vercel**
  - Update `VITE_API_BASE_URL` to Render backend URL

- **Backend**: Deploy `/server` to **Render**
  - Add env vars in Render dashboard
  - Update `CLIENT_ORIGIN` to deployed Vercel URL (e.g. `https://yourapp.vercel.app`)
  - Set `NODE_ENV=production`

---

## 🤖 How to Set Up Google reCAPTCHA

### Step 1: Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
- Choose **reCAPTCHA v3**
- Add domain(s) (for local use, add `localhost`)

### Step 2: Get Your Keys
- **Site Key** → add to `client/.env` → `VITE_RECAPTCHA_SITE_KEY`
- **Secret Key** → add to `server/.env` → `RECAPTCHA_SECRET_KEY`

---

## 🔗 API Routes

| Method | Endpoint            | Middleware             | Description               |
|--------|---------------------|------------------------|---------------------------|
| `GET`  | `/api/user-info`    | `verifyToken`          | Fetch user info (protected) |
| `GET`  | `/api/refresh-token`| —                      | Refresh access token      |
| `POST` | `/api/signup`       | `recaptcha`            | Register new user         |
| `POST` | `/api/login`        | `recaptcha`            | Log in user               |
| `POST` | `/api/logout`       | —                      | Clear cookies, log out    |

---

## 🔐 Security Highlights

- ✅ Passwords hashed using `bcrypt`
- ✅ JWTs signed with secrets
- ✅ Tokens stored in HTTP-only cookies (not accessible via JS)
- ✅ reCAPTCHA prevents bot signup/login
- ✅ `sameSite: "None"` and `secure: true` used for cross-origin cookies (Vercel ↔ Render)

---

## 📌 Tips

- Frontend should always send requests with `withCredentials: true` using Axios.
- Backend must set `Access-Control-Allow-Credentials: true` in CORS.

---

## ✨ Author

Made by [Dan Galano](https://github.com/Dan-Galano)

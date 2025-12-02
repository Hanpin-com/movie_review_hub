# 🎬 Movie Review Hub — Phase 5

## Full-Stack Authentication • OTP Login • JWT Security • RBAC • Secure CRUD Integration

---

## 📝 1. Project Overview

This project represents the completion of **Phase 5** in CPAN-212, expanding our movie management system into a **secure, full-stack web application**.

Phase 5 introduces **Authentication + Authorization** on top of the earlier CRUD API and frontend integration from Phase 3 & Phase 4.

This final phase includes:

* **Email-based login with OTP (One-Time Password)**
* **JWT-based authentication**
* **Role-based authorization (admin / user)**
* **Protected movie CRUD operations**
* **Frontend login + OTP forms**
* **LocalStorage token management**
* **Secure communication between frontend & backend**

---

## 🎯 2. Phase 5 Objectives

### 🔐 Authentication (Login + OTP)

* Implement `/api/auth/login`
* Generate a 6-digit OTP
* Save `otp` + `otpExpiresAt` into MongoDB
* Implement `/api/auth/verify-otp`
* Return JWT token + user object
* Frontend Login Page + OTP Page
* Store `{ token, user }` in localStorage

### 🛡 Authorization (RBAC)

* Middleware `auth.js` to verify JWT
* Middleware `require-role.js` to restrict admin routes
* Protect CRUD operations:

  * `POST /api/movies` → admin only
  * `PUT /api/movies/:id` → admin only
  * `DELETE /api/movies/:id` → admin only

### 🖥 Frontend Integration

* Login Page (email + password)
* OTP Page
* Navbar user status (Logged in as…)
* Logout button
* Token automatically added in protected routes
* Admin-only UI for:

  * Add movie
  * Edit movie
  * Delete movie

---

## 📁 3. Project Structure

```
movie_review_hub/
│
├── backend/
│   ├── modules/
│   │   ├── movies/
│   │   ├── users/
│   │   └── reviews/
│   ├── shared/
│   │   └── middlewares/
│   │       ├── auth.js
│   │       └── require-role.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OtpPage.jsx
│   │   │   ├── MovieListPage.jsx
│   │   │   ├── MovieDetailPage.jsx
│   │   │   ├── MovieCreatePage.jsx
│   │   │   └── MovieEditPage.jsx
│   │   ├── utils/auth.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── ScreenShot/
    └── Phase5/
```

---

## 🔧 4. Technology Stack

### Backend

* Node.js + Express
* MongoDB Atlas
* Mongoose ORM
* JSON Web Token (JWT)
* express-validator
* dotenv
* CORS

### Frontend

* React (Vite)
* React Router DOM
* Fetch API
* LocalStorage-based auth
* CSS Grid + Responsive UI

---

## 🔐 5. Authentication Flow (Phase 5)

### 1️⃣ User Login

Client → `POST /api/auth/login`
Backend:

* Checks email + password
* Creates 6-digit OTP
* Saves OTP + expiration to DB
* Sends OTP (console log or email service)

### 2️⃣ OTP Verification

Client → `POST /api/auth/verify-otp`
Backend:

* Validates OTP
* Creates JWT token
* Returns `{ token, user }`

### 3️⃣ Frontend

* Saves token in `localStorage`
* Navbar updates ("Logged in as…")
* Protects UI elements
* Sends authorization headers for admin routes

---

## 🛡 6. Authorization Rules (RBAC)

| Action          | Role Required | Notes                          |
| --------------- | ------------- | ------------------------------ |
| View movie list | public        | no login required              |
| View details    | public        | no login required              |
| Add movie       | admin         | protected by JWT + requireRole |
| Edit movie      | admin         | protected                      |
| Delete movie    | admin         | protected                      |
| Login, OTP      | public        | used to get token              |
| Logout          | any           | clears localStorage            |

---

## 🧩 7. Backend Code Summary

### ✔ JWT Auth Middleware — `auth.js`

```js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = auth;
```

### ✔ Role Middleware — `require-role.js`

```js
function requireRole(roles = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}

module.exports = requireRole;
```

### ✔ Protected Movie Routes

```js
moviesRoute.post('/', auth, requireRole(['admin']), async (req, res, next) => { ... });
moviesRoute.put('/:id', auth, requireRole(['admin']), async (req, res, next) => { ... });
moviesRoute.delete('/:id', auth, requireRole(['admin']), async (req, res, next) => { ... });
```

---

## 🖥 8. Frontend Auth Integration

### ✔ Token Storage — `/src/utils/auth.js`

```js
export function saveAuth(token, user) {
  localStorage.setItem('moviehub_auth', JSON.stringify({ token, user }));
}

export function getAuth() {
  const raw = localStorage.getItem('moviehub_auth');
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem('moviehub_auth');
}

export function getAuthHeaders() {
  const auth = getAuth();
  return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
}
```

### ✔ LoginPage.jsx

Collects email + password → calls `/auth/login`.

### ✔ OtpPage.jsx

Collects email + OTP → receives JWT → saves to localStorage → redirects.

### ✔ Navbar.jsx

Shows login/logout + current user.

### ✔ MovieCreate / Edit / Delete

Sends token:

```js
headers: {
  'Content-Type': 'application/json',
  ...getAuthHeaders()
}
```

---

## 📸 9. Phase 5 Screenshots

Screenshots stored in:

```
/ScreenShot/Phase5/
```

| #   | Screenshot          | Description                   |
| --- | ------------------- | ----------------------------- |
| 1️⃣ | Login.png           | Login Page                    |
| 2️⃣ | OTP.png             | OTP Verification Page         |
| 3️⃣ | Logged-In.png       | Navbar showing logged-in user |
| 4️⃣ | Movie-Grid.png      | Public movie list             |
| 5️⃣ | Add-Movie.png       | Add Movie (admin only)        |
| 6️⃣ | Edit-Movie.png      | Edit Movie (admin only)       |
| 7️⃣ | Delete-Movie.png    | Delete confirmation           |
| 8️⃣ | Backend-Running.png | MongoDB + server running      |

---

## 👥 10. Team Contributions

### **Phase 3 — Backend**

| Member                       | Contribution                                               |
| ---------------------------- | ---------------------------------------------------------- |
| **Han-Pin Hung (N01747642)** | Movies module, Reviews module, CRUD testing, documentation |
| **Eduardo Lee (N01685266)**  | Users module, server.js, validation, DB integration        |
| **Both**                     | Postman testing, project structure, README                 |

### **Phase 4 — Frontend**

| Member           | Contribution                                             |
| ---------------- | -------------------------------------------------------- |
| **Han-Pin Hung** | Complete React UI, routing, grid layout, API integration |
| **Eduardo Lee**  | Backend adjustments, CRUD compatibility testing          |

### **Phase 5 — Authentication & Authorization**

| Member           | Contribution                                                            |
| ---------------- | ----------------------------------------------------------------------- |
| **Han-Pin Hung** | LoginPage, OtpPage, JWT integration, Navbar, protected routes, admin UI |
| **Eduardo Lee**  | Backend OTP flow, JWT middleware, role-based protection                 |
| **Both**         | End-to-end testing, debugging, screenshots, final integration           |

---

## 📎 11. Repository

👉 **[https://github.com/Hanpin-com/movie_review_hub](https://github.com/Hanpin-com/movie_review_hub)**

This final submission includes:

* Backend (Phase 3)
* React Frontend (Phase 4)
* Authentication (Phase 5)
* OTP + JWT + RBAC
* Secure CRUD with admin-only actions
* Complete screenshots
* Updated README

---
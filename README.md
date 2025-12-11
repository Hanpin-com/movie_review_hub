# 🎬 Movie Review Hub — Final Capstone Project

## Full-Stack Movie Management System
**Authentication • RBAC • MFA (OTP) • Search/Filter/Pagination • Secure Deployment**

---

## 🚀 Live Demo (Deployment)

| Application | Platform | Status | Link |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel | 🟢 Live | **[🔗 Click Here to View App](INSERT_YOUR_VERCEL_URL_HERE)** |
| **Backend** | Render | 🟢 Live | **[🔗 API Endpoint](INSERT_YOUR_RENDER_URL_HERE)** |

> **Note:** The backend is hosted on Render's free tier. It may take roughly 50 seconds to wake up on the first request. Please be patient!

---

## 📝 1. Project Overview

This project represents the complete, fully functional submission for **CPAN-212**. It is a full-stack web application that allows users to browse movie listings and reviews, while providing a secure environment for administrators to manage content.

The system integrates a **React** frontend with a **Node.js/Express** backend and **MongoDB**, featuring advanced security protocols including **MFA (OTP via Email)**, **JWT Authentication**, and **Role-Based Access Control (RBAC)**.

---

## 🎯 2. Features & Functionality

### 🔐 Security & Authentication
* **MFA / OTP Login:** Secure login flow using Email + Password followed by a 6-digit One-Time Password (OTP).
* **JWT Authorization:** Stateless authentication using JSON Web Tokens stored securely in LocalStorage.
* **Role-Based Access Control (RBAC):**
    * **Public:** View movies, view details, pagination, search.
    * **Admin:** Create, Edit, Delete movies.
* **Protected Routes:** Frontend guards (React Router) prevent unauthorized access to admin pages.

### 🛠 Core Operations
* **Complete CRUD:** Fully functional Create, Read, Update, and Delete operations for movies.
* **Advanced Data Retrieval:**
    * **Pagination:** Efficiently loads movie data in chunks to improve performance.
    * **Search:** Find movies by title or keyword.
    * **Filtering:** Filter movies by specific criteria (e.g., genre or release year).

### 🛡 Error Handling & UX
* **Backend:** Returns meaningful HTTP status codes (401, 403, 404, 500) and structured JSON error messages.
* **Frontend:** Displays user-friendly error notifications (e.g., "Invalid OTP," "Server Timeout") instead of crashing.
* **Loading States:** Visual indicators during data fetching and authentication processes.

---

## 🧠 3. Learning Outcomes

Throughout the development of this project, we explored and mastered several key concepts:
* **Stateless Authentication:** Learned how to implement JWTs effectively, removing the need for server-side session storage.
* **Two-Factor Logic:** Gained insight into implementing OTP flows, including handling expiration times and verifying codes against database records.
* **Middleware Pattern:** Mastered the creation of custom Express middleware to modularize security logic (checking headers, decoding tokens).
* **Deployment Pipelines:** Learned how to deploy a split-stack application using Vercel (Frontend) and Render (Backend), managing environment variables across different platforms.

---

## 🚧 4. Challenges & Solutions

* **Managing Async OTP Flow:**
    * *Challenge:* Coordinating the multi-step process of requesting an OTP and verifying it without losing user state.
    * *Solution:* Split the frontend into two distinct pages (`LoginPage` and `OtpPage`) and utilized the backend database to hold the temporary OTP state.
* **JWT Persistence:**
    * *Challenge:* Ensuring the user remained logged in after a page refresh.
    * *Solution:* Created a utility file to handle LocalStorage operations and automatically inject the `Authorization: Bearer` header into fetch requests.
* **CORS & Deployment:**
    * *Challenge:* Communicating between Vercel and Render caused CORS errors during the final phase.
    * *Solution:* Configured the backend CORS middleware to explicitly allow requests from the Vercel domain.

---

## 🔮 5. Future Improvements

* **Real Email Integration:** Integrate SendGrid or Nodemailer to send actual emails instead of console logging the OTP.
* **User Registration:** Add a public sign-up flow to allow new users to register.
* **Image Uploading:** Replace URL text inputs with actual file uploading using Multer and AWS S3/Cloudinary.
* **User Reviews:** Allow authenticated non-admin users to post and edit their own reviews.

---

## 🔧 6. Technology Stack

### Backend (Deployed on Render)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Security:** `jsonwebtoken`, `bcryptjs`, `express-validator`

### Frontend (Deployed on Vercel)
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **Styling:** CSS Grid, Responsive Design
* **State Management:** React Hooks + LocalStorage

---

## 📁 7. Project Structure

```text
movie_review_hub/
│
├── backend/            # Express Server
│   ├── modules/        # Feature-based logic (Movies, Users, Reviews)
│   ├── shared/         # Middleware (Auth, Role, ErrorHandler)
│   ├── server.js       # Entry point
│   └── .env            # Environment variables (Mongo URI, JWT Secret)
│
├── frontend/           # React Client
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, MovieCard)
│   │   ├── pages/      # Views (Login, OTP, MovieList, Dashboard)
│   │   ├── utils/      # Auth helpers & API service
│   │   └── App.jsx     # Main Route definitions
│
└── README.md
```

---

## 👥 8. Team Contributions

| Member | Role & Contributions |
| :--- | :--- |
| **Han-Pin Hung (N01747642)** | Frontend Architecture, UI/UX, React Router, Search/Filter Implementation, Vercel Deployment. |
| **Eduardo Lee (N01685266)** | Backend Architecture, Database Schema, Auth Middleware, Error Handling logic, Render Deployment. |

---

## 📎 9. Local Installation

If you wish to run this locally instead of using the live links:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/Hanpin-com/movie_review_hub.git](https://github.com/Hanpin-com/movie_review_hub.git)
    ```
2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create .env file with MONGO_URI and JWT_SECRET
    npm start
    ```
3.  **Setup Frontend:**
    ```bash
    cd frontend
    npm install
    # Update API_URL to http://localhost:PORT
    npm run dev
    ```

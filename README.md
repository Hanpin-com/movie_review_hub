# 🎬 Movie Review Hub — Phase 4: Full-Stack React Integration (Frontend + Backend)

---

## 📝 1. Project Overview

This project represents **Phase 4 – Full Frontend Integration with React**, building on top of the backend CRUD API developed in **Phase 3**.
In this phase, our team extended the application into a complete **full-stack movie management system**, combining:

* **React (frontend UI)**
* **Express.js (backend API)**
* **MongoDB Atlas (database)**

The objective of this phase is to enable full CRUD operations through a user-friendly website, connecting the backend built in previous phases with a fully interactive interface.

---

## 🎯 2. Phase 4 Objectives

### Frontend (React)

* Build a complete React + Vite project
* Implement CRUD pages:
  **Movie List • Movie Detail • Add Movie • Edit Movie**
* Integrate with backend API using `fetch()`
* Use **React Router** for multipage navigation
* Add form validation, UI messages, error handling
* Use **CSS Grid layout** to display movie cards
* Add additional fields (`rating` + `genre`) to match backend updates
* Show success message **without redirecting**, plus “Back to List” button

### Backend (Phase 3 foundation)

* Continue using modular routing structure
* Add support for new fields (`rating`, `genre`)
* Ensure full compatibility with the frontend
* Test final CRUD operations end-to-end

---

## 📁 3. Project Structure

```
movie_review_hub/
│
├── backend/                 # Phase 3 backend
│   ├── modules/
│   ├── shared/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/                # Phase 4 frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── MovieListPage.jsx
│   │   │   ├── MovieDetailPage.jsx
│   │   │   ├── MovieCreatePage.jsx
│   │   │   └── MovieEditPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── ScreenShot/
│   └── Phase4/
│
└── README.md
```

---

## 🔧 4. Technology Stack

### Backend

* Node.js + Express
* MongoDB Atlas
* Mongoose ORM
* express-validator
* dotenv + CORS

### Frontend

* React (Vite)
* React Router DOM
* JSX
* Fetch API
* Custom CSS (grid layout)

---

## 🧩 5. Backend Movie Model (Updated for Phase 4)

```js
{
  title:       { type: String, required: true },
  genre:       { type: String, required: true },
  director:    { type: String },
  rating:      { type: Number },          // Added in Phase 4
  releaseYear: Number,
  description: String
}
```

---

## 🔗 6. Frontend Features (Phase 4)

### ✔ Movie List Page (Card Grid)

* Fetches from `/api/movies`
* Displays cards with:

  * title
  * rating
  * genre
  * director
* Includes **Details / Edit / Delete** buttons
* Cineplex-style responsive grid layout

---

### ✔ Movie Detail Page

* Fetches a single movie from `/api/movies/:id`
* Displays full movie info
* Includes “Back to List” button

---

### ✔ Add Movie Page

* Form inputs: title, rating, genre, director
* Client-side validation
* Success message **without redirecting**
* Manual button to return to list

---

### ✔ Edit Movie Page

* Preloaded form fields
* PUT updates through `/api/movies/:id`
* Success message **without redirecting**
* Manual “Back to List” button

---

### ✔ Delete Movie

* Deletes movie card immediately
* Updates frontend via refresh after DELETE request

---

## 🚀 7. Running the Project

### Backend

```
cd backend
npm install
npm start
```

`.env`:

```
MONGODB_URI=YOUR_ATLAS_STRING
PORT=3000
HOST=localhost
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

`.env`:

```
VITE_API_URL=http://localhost:3000
```

Open:

```
http://localhost:5173/movies
```

---

## 📸 8. Phase 4 Screenshots

（`movie_review_hub/frontend/ScreenShot/Phase4/`）

| #   | Screenshot              | Description                         |
| --- | ----------------------- | ----------------------------------- |
| 1️⃣ | *Movie-Grid.png*        | Movie List Page (Card Grid Layout)  |
| 2️⃣ | *Add-Movie.png*         | Add Movie Form                      |
| 3️⃣ | *Add-Success.png*       | Create movie success message        |
| 4️⃣ | *Movie-Details.png*     | Detail page                         |
| 5️⃣ | *New-Movie.png*         | Newly added movie displayed in list |
| 6️⃣ | *Delete-Movie.png*      | Delete confirmation / list refresh  |
| 7️⃣ | *Backend-Running.png*   | Backend server running (MongoDB OK) |
| 8️⃣ | *Frontend-Running.png*  | Frontend (Vite) dev server running  |


---

# 👥 9. Team Contributions

## **Phase 3 – Backend Development**

| Member                       | Contribution                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------- |
| **Han-Pin Hung (N01747642)** | Movies and Reviews modules, route testing, documentation                         |
| **Eduardo Lee (N01685266)**  | Developed server.js, Users module, database integration, validation              |
| **Both Members**             | Repository setup, Postman testing, README preparation, final backend integration |

---

## **Phase 4 – Full-Stack Integration**

| Member                       | Contribution                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Han-Pin Hung (N01747642)** | Lead frontend developer: built full React UI, grid layout, CRUD pages, routing, form validation, API integration, styling, schema updates, debugging, and documentation. |
| **Eduardo Lee (N01685266)**  | Backend compatibility improvements, testing CRUD operations, assisting in API debugging, database verification, submission review.                                       |
| **Both Members**             | End-to-end testing, screenshot preparation, final submission.                                                                                                            |

---

## 📎 10. Submission

GitHub Repository:
👉 **[https://github.com/Hanpin-com/movie_review_hub](https://github.com/Hanpin-com/movie_review_hub)**

This submission includes:

* Backend (Phase 3)
* React Frontend (Phase 4)
* Screenshots
* Updated README
* Movie schema updates (rating & genre)
* CRUD fully tested

---

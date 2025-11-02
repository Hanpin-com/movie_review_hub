# 🎬 Movie Review Hub — Phase 3: Full CRUD API with MongoDB Integration

---

## 📝 1. Project Overview

This project is developed as part of **Phase 3 – Full CRUD API with MongoDB Integration**.  
The goal of this phase is to extend the modular architecture created in Phase 2 by connecting the project to a **MongoDB database**, implementing **real persistence**, and validating the full CRUD flow using **Postman**.

### 🎯 Main Objectives

- Integrate a **MongoDB Atlas database** using Mongoose ORM  
- Implement **CRUD operations** for Movies, Reviews, and Users  
- Apply **express-validator** for input validation  
- Use **shared middleware** for DB connection and validation error handling  
- Verify all endpoints through **Postman testing**

---

## 📁 2. Project Structure

```

movie_review_hub/
│
├── modules/
│   ├── movies/
│   │   ├── middlewares/
│   │   │   ├── create-movie-rules.js
│   │   │   └── update-movie-rules.js
│   │   ├── movies-model.js
│   │   └── movies-routes.js
│   │
│   ├── reviews/
│   │   ├── middlewares/
│   │   │   ├── create-reviews-rules.js
│   │   │   └── update-reviews-rules.js
│   │   ├── reviews-model.js
│   │   └── reviews-routes.js
│   │
│   └── users/
│       ├── middlewares/
│       │   ├── create-users-rules.js
│       │   └── update-users-rules.js
│       ├── users-model.js
│       └── users-routes.js
│
├── shared/
│   ├── middlewares/
│   │   ├── check-validation.js
│   │   └── connect-db.js
│
├── .env
├── server.js
├── package.json
└── README.md

```

### 🔹 Architecture Highlights

- **Feature-based modules:** Each entity (Movies, Reviews, Users) has its own model, routes, and validation middleware.  
- **Shared middlewares:** Common logic (DB connection, validation handling) resides in `/shared/middlewares`.  
- **Separation of concerns:** Routes handle HTTP requests only; business logic resides in models.  
- **Environment configuration:** `.env` is used for secure DB connection.

---

## 📊 3. Database Schema (MongoDB + Mongoose)

The project uses **MongoDB Atlas** as a cloud database, managed through **Mongoose models**.

### 🎥 Movie Schema

```js
{
  title: String,
  genre: String,
  director: String,
  releaseYear: Number,
  description: String,
  createdAt: Date
}
```

### 👤 User Schema

```js
{
  username: String,
  email: String,
  password: String
}
```

### 📝 Review Schema

```js
{
  movieId: ObjectId, 
  userId: ObjectId,
  rating: Number,
  comment: String,
  createdAt: Date
}
```

---

## ⚙️ 4. Application-Level Middleware (server.js)

* `dotenv` — Loads environment variables from `.env`
* `cors()` — Enables CORS for API access
* `express.json()` & `express.urlencoded()` — Parses incoming requests
* `connectDB()` — Connects to MongoDB Atlas before the server starts
* Global error-handling middleware — Returns standardized error JSON
* 404 middleware — Handles unknown routes gracefully

---

## 🧠 5. Model Logic

Each model file defines database operations using **Mongoose methods**:

* `getAll<Entity>()` — Retrieve all documents
* `get<Entity>ById(id)` — Retrieve a document by ID
* `addNew<Entity>(data)` — Create a new record
* `updateExisting<Entity>(id, data)` — Update an existing record
* `delete<Entity>(id)` — Delete a record

⚠️ No direct DB logic is inside routes — ensuring modularity and maintainability.

---

## 🧭 6. Routes

All feature modules use `Express.Router()` and are mounted in `server.js` under `/api/<entity>`.

### 🎥 Movies Routes (`/api/movies`)

* `GET /` — Get all movies
* `GET /:id` — Get a single movie
* `POST /` — Create a movie (validated)
* `PUT /:id` — Update a movie (validated)
* `DELETE /:id` — Delete a movie

### 👤 Users Routes (`/api/users`)

* `GET /` — Get all users
* `POST /` — Create a new user
* `GET /:id` — Get a user by ID
* `PUT /:id` — Update a user
* `DELETE /:id` — Delete a user

### 📝 Reviews Routes (`/api/reviews`)

* `GET /` — Get all reviews
* `POST /` — Create a new review
* `GET /:id` — Get review by ID
* `PUT /:id` — Update review
* `DELETE /:id` — Delete review

---

## 🧪 7. Validation & Error Handling

Validation is done using **express-validator**, defined in each module’s `/middlewares/` folder.
Shared validation response handler (`check-validation.js`) ensures consistent JSON output.

---

## 📡 8. HTTP Response Format

All responses are returned as **JSON**, following RESTful conventions:

| Status Code               | Meaning                           |
| ------------------------- | --------------------------------- |
| 200 OK                    | Successful GET / PUT / DELETE     |
| 201 Created               | Successfully created a new record |
| 400 Bad Request           | Validation or input error         |
| 404 Not Found             | Resource not found                |
| 500 Internal Server Error | Server-side error                 |

---

## 📸 9. Screenshots (Phase 3 Evidence)

All the screenshot in the file of "ScreenShot".

All routes tested successfully using **Postman**.

---

## 👥 10. Team Contributions

| Member                       | Contribution                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **Han-Pin Hung (N01747642)** | Developed server.js, Users module, database integration, and validation      |
| **Eduardo Lee (N01685266)**  | Movies and Reviews modules, route testing, documentation                     |
| **Both Members**             | Repository setup, Postman testing, README preparation, and final integration |

---

## 🚀 11. Submission Information

| Item                 | Detail                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 📎 GitHub Repository | [https://github.com/Hanpin-com/movie_review_hub.git](https://github.com/Hanpin-com/movie_review_hub.git)              |
| ✅ Completed Tasks    | MongoDB Integration • Modular Architecture • CRUD Logic • Validation • Error Handling • Documentation • Postman Tests |

---

✍️ **Authors:** Han-Pin Hung & Eduardo Lee
📘 **Course:** Humber College – Modern Web Technologies-CPAN-212-ONG Phase 3

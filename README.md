## 📝 Project Overview

This project is developed as part of **Phase 2 – Modular Architecture Implementation**.
The main goals are to:

* Design and implement a **feature-based modular architecture**
* Build CRUD business logic for multiple entities
* Apply input validation and error handling
* Use shared middleware to keep the architecture clean, maintainable, and scalable

---

## 📁 1. Project Structure

```
movie_review_hub/
│
├── modules/
│   ├── movies/
│   │   ├── middlewares/
│   │   │   ├── create-movie-rules.js
│   │   │   └── update-movie-rules.js
│   │   ├── movie-model.js
│   │   └── movie-route.js
│   │
│   ├── reviews/
│   │   ├── middlewares/
│   │   │   ├── create-reviews-rules.js
│   │   │   └── update-reviews-rules.js
│   │   ├── reviews-model.js
│   │   └── reviews-route.js
│   │
│   └── users/
│       ├── middlewares/
│       │   ├── create-users-rules.js
│       │   └── update-users-rules.js
│       ├── users-model.js
│       └── users-route.js
│
├── shared/
│   ├── middlewares/
│   │   ├── check-validation.js
│   │   └── connect-db.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

### 🔸 Architecture Highlights

* `modules/` → Feature-based structure for Movies, Reviews, and Users
* `middlewares/` → Each module has its own validation logic
* `shared/` → Common logic such as DB connection and validation handler
* `server.js` → Application-level middleware and main entry point

---

## 📊 2. Data Structure

Data is stored in JSON files (or can be adapted to a database in the future):

* **Movies**: `id`, `title`, `genre`, `year`, `rating`, `description`
* **Reviews**: `id`, `movieId`, `userId`, `comment`, `score`
* **Users**: `id`, `username`, `email`, `password`

---

## ⚙️ 3. Application-Level Middleware

Implemented in `server.js`:

* `express.json()` and `express.urlencoded({ extended: true })` for parsing requests
* 404 middleware for unknown routes
* Global error-handling middleware for catching server errors

---

## 🧠 4. Model Logic

Each module has its own `model` file that handles all business logic:

* `getAll<Entity>()` → Fetch all records
* `get<Entity>ById(id)` → Fetch a single record
* `addNew<Entity>(data)` → Create a new record
* `updateExisting<Entity>(id, data)` → Update an existing record
* `delete<Entity>(id)` → Delete a record

⚠️ No business logic is written inside routes.
All logic is delegated to models.

---

## 🧭 5. Routes

Each feature has its own router using `Express.Router()`.

**Movies Routes** (`/api/movies`):

* `GET /` → Get all movies
* `GET /:id` → Get a single movie
* `POST /` → Create a movie (with validation)
* `PUT /:id` → Update a movie (with validation)
* `DELETE /:id` → Delete a movie

**Reviews Routes** (`/api/reviews`):
Same structure as movies.

**Users Routes** (`/api/users`):
Same structure as movies.

---

## 🧪 6. Route-Level Middleware & Validation

Validation is implemented using **express-validator**.

Each module has its own validation rules:

* `create-movie-rules.js` and `update-movie-rules.js`
* `create-reviews-rules.js` and `update-reviews-rules.js`
* `create-users-rules.js` and `update-users-rules.js`

✅ Shared validation logic is handled in:

* `shared/middlewares/check-validation.js` — centralizes validation error handling.

---

## 🗃️ 7. Shared Middleware

* `check-validation.js` → Handles validation errors and returns consistent responses.
* `connect-db.js` → Sets up or abstracts database connection (currently can connect to local data or be extended to real DB).

This allows reusability and keeps modules clean.

---

## 📡 8. HTTP Response Format

All responses are returned in **JSON** format with proper HTTP status codes:

| Status Code               | Description                   |
| ------------------------- | ----------------------------- |
| 200 OK                    | Successful GET / PUT / DELETE |
| 201 Created               | Successful POST               |
| 400 Bad Request           | Validation error              |
| 404 Not Found             | Resource not found            |
| 500 Internal Server Error | Server error                  |

---

## 🧰 9. Testing

* All routes tested with Postman.
* CRUD operations verified for all entities.
* Validation and error handling tested through invalid input scenarios.
* Shared middleware (`check-validation`) confirmed to catch errors globally.

---

## 👥 10. Team Contributions

| Name              | Contribution                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| **Han-Pin Hung (N01747642)**  | Movies module (model, routes, validation), server.js middleware, shared utils |
| **Eduardo Lee (N01685266)** | Reviews & Users modules (model, routes, validation), error handling & testing |
| **Both Members**  | GitHub repo setup, Postman testing, documentation, final integration          |

---

## 🚀 11. Submission Information

* 📎 GitHub Repository: https://github.com/Hanpin-com/movie_review_hub.git
* 📅 Due Date: **October 13, 2025**
* ✅ Completed:

  * Feature-based modular architecture
  * CRUD model logic
  * Validation middleware
  * Shared middleware (check-validation, connect-db)
  * Error handling
  * API testing
  * Documentation

---

✅ **Last Updated:** October 13, 2025
✍️ **Authors:** Han-Pin Hung & Eduardo Lee

---
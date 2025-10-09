# Lab 4

> Weightage: 2.5  
> Deadline: 12:00 AM tomorrow noon (Oct 10).  
> _Submissions after the deadline will receive only **75%** of the points earned._

---

### Overview:

In this lab, you will:

- Connect your Express app to MongoDB using Mongoose via middleware.
- Define Mongoose models for `Customer` and `Product` according to given schemas.
- Implement modular Express routes to handle CRUD operations for customers and products.
- Use environment variables to configure the database connection.
- Apply appropriate HTTP status codes and handle errors gracefully.

---

### File Instructions

You will work on **6 main files**:

1. `shared/middlewares/connect-db.js`
2. `server.js`
3. `modules/customers/customers-models.js`
4. `modules/customers/customers-routes.js`
5. `modules/products/products-models.js`
6. `modules/products/products-routes.js`

---

#### ./shared/middlewares/connect-db.js

**Connect MongoDB using Mongoose in an Express middleware:**

1. Import the 'mongoose' library at the top of the file.
2. Access the MongoDB connection URL from environment variables using `process.env.DB_URL`.
   _(Ensure the DB_URL is defined in a `.env` file.)_
3. Create an asynchronous middleware function called `connectDB` that takes `(req, res, next)` as parameters.
4. Inside the function, use a `try...catch` block to manage connection logic.
5. In the `try` block, call `mongoose.connect()` with the database URL.

   - Pass an options object that includes the `dbName` (e.g., `{ dbName: "YourDatabaseName" }`).

6. After successfully connecting, log a message like `"Database connected!"`.
7. Call `next()` to pass control to the next middleware or route.
8. In the `catch` block, log the error and throw a new Error with a message like `"Database connection failed!"`.
9. Export the `connectDB` function using `module.exports` so it can be used in other parts of the application.

---

#### server.js

1. Import and configure the `dotenv` package at the top of `server.js` to load environment variables:

   ```js
   require("dotenv").config();
   ```

2. Add the `connectDB` middleware at the application-level, **before** defining routes.

---

#### Environment Variables

1. Create a `.env` file with the following:

   ```env
   DB_URL=your_mongodb_connection_string_here
   ```

2. Replace `your_mongodb_connection_string_here` with your actual MongoDB connection URI.

---

#### ./modules/customers/customers-model.js

**Instructions to define a Customer model using Mongoose:**

1. Import the 'mongoose' library at the top of the file.
2. Create a new schema named `customerSchema` using `new mongoose.Schema()`.
3. Define the following fields in the schema:

   - `name`: A string (optional).
   - `email`: A required string that must be unique across documents.
   - `phone`: A required string.
   - `address`: A string (optional).
   - `myCart`: A reference to another MongoDB document, using `mongoose.Schema.Types.ObjectId`, and referring to the `"Cart"` collection.
   - `createdAt`: A date field that defaults to the current date and time (use `Date.now` as the default).

4. Create a Mongoose model named `"Customer"` from this schema.
5. Export the model using `module.exports` so it can be imported and used in other files.

---

#### ./modules/customers/customers-routes.js

1. Import your `CustomerModel`.
2. Retrieve all customers from the database.

   - You can use model methods like `.find()` or `.find({})` to get all documents.
   - If no customers exist, respond with an empty array.
   - Send the retrieved customers as a JSON response.

3. Retrieve a single customer by ID from the URL parameters.

   - Use model functions such as `.findById()`, `.findOne({ _id: id })`, or `.findOne({ id })`.
   - If the customer is not found, respond with a 404 status and an appropriate message.
   - If found, return the customer as JSON.

4. Create a new customer using data from the request body.

   - Possible model functions: `.create()` or `new CustomerModel()` followed by `.save()`.
   - Provide required fields such as name, category, price, and optional description.
   - On failure to add, respond with a 500 error.
   - On success, return the newly created customer.

5. Update the customer’s fields.

   - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
   - If not found, respond with 404.
   - Options for updating include `.findByIdAndUpdate()`, `.updateOne()`, or fetching the document and modifying fields then `.save()`.
   - Use `{ new: true }` option if available to return the updated document.
   - Handle failure by responding with 500.
   - Return the updated customer on success.

6. Delete the customer.

   - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
   - If not found, respond with 404.
   - Delete the customer using model methods such as `.findByIdAndDelete()`, `.deleteOne()`, or `.findOneAndDelete()`.
   - On failure, respond with 500.
   - Return the deleted customer on success.

---

#### ./modules/products/products-model.js

**Instructions to define a Product model using Mongoose in `products-model.js`:**

1. Import the 'mongoose' library at the top of the file.
2. Create a new Mongoose schema called `productSchema` using `new mongoose.Schema()`.
3. Define the following fields in the schema:

   - `product_name`: A required string with a minimum length of 6 characters.
   - `description`: An optional string with a maximum length of 500 characters. Set a default value of an empty string.
   - `price`: A required number that must be greater than or equal to 0.
   - `category`: A required string to classify the product.
   - `createdAt`: A date field that defaults to the current date and time (use `Date.now` as the default).

4. Use `mongoose.model()` to create a model named `"Product"` from the `productSchema`.
5. Export the model using `module.exports` so it can be used in other parts of the application.

---

#### ./modules/products/products-routes.js

1. Import your `ProductModel`.
2. Retrieve all products from the database.

   - You can use model methods like `.find()` or `.find({})` to get all documents.
   - If no products exist, respond with an empty array.
   - Send the retrieved products as a JSON response.

3. Retrieve a single product by ID from the URL parameters.

   - Use model functions such as `.findById()`, `.findOne({ _id: id })`, or `.findOne({ id })`.
   - If the product is not found, respond with a 404 status and an appropriate message.
   - If found, return the product as JSON.

4. Create a new product using data from the request body.

   - Possible model functions: `.create()` or `new ProductModel()` followed by `.save()`.
   - Provide required fields such as product_name, category, price, and optional description.
   - On failure to add, respond with a 500 error.
   - On success, return the newly created product.

5. Update the product’s fields.

   - Check if the product exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
   - If not found, respond with 404.
   - Options for updating include `.findByIdAndUpdate()`, `.updateOne()`, or fetching the document and modifying fields then `.save()`.
   - Use `{ new: true }` option if available to return the updated document.
   - Handle failure by responding with 500.
   - Return the updated product on success.

6. Delete the product.

   - Check if the product exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
   - If not found, respond with 404.
   - Delete the product using model methods such as `.findByIdAndDelete()`, `.deleteOne()`, or `.findOneAndDelete()`.
   - On failure, respond with 500.
   - Return the deleted product on success.

---

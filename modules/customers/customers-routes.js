const { Router } = require("express");
const createCustomerRules = require("./middlewares/create-customers-rules");
const updateCustomerRules = require("./middlewares/update-customers-rules");
/**
 * TODO: 1. Import your CustomerModel.
 */

const customersRoute = Router();

/**
 * TODO: 2. Retrieve all customers from the database.
 *    - You can use model methods like `.find()` or `.find({})` to get all documents.
 *    - If no customers exist, respond with an empty array.
 *    - Send the retrieved customers as a JSON response.
 */
customersRoute.get("/customers", (req, res) => {});

/**
 * TODO: 3. Retrieve a single customer by ID from the URL parameters.
 *    - Use model functions such as `.findById()`, `.findOne({ _id: id })`, or `.findOne({ id })`.
 *    - If the customer is not found, respond with a 404 status and an appropriate message.
 *    - If found, return the customer as JSON.
 */
customersRoute.get("/customers/:id", (req, res) => {});

/**
 * TODO: 4. Create a new customer using data from the request body.
 *    - Possible model functions: `.create()` or `new CustomerModel()` followed by `.save()`.
 *    - Provide required fields such as name, category, price, and optional description.
 *    - On failure to add, respond with a 500 error.
 *    - On success, return the newly created customer.
 */
customersRoute.post("/customers", createCustomerRules, (req, res) => {});

/**
 * TODO: 5. Update the customer’s fields.
 *    - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Options for updating include `.findByIdAndUpdate()`, `.updateOne()`, or fetching the document and modifying fields then `.save()`.
 *    - Use `{ new: true }` option if available to return the updated document.
 *    - Handle failure by responding with 500.
 *    - Return the updated customer on success.
 */
customersRoute.put("/customers/:id", updateCustomerRules, (req, res) => {});

/**
 * TODO: 6. Delete the customer.
 *    - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Delete the customer using model methods such as `.findByIdAndDelete()`, `.deleteOne()`, or `.findOneAndDelete()`.
 *    - On failure, respond with 500.
 *    - Return the deleted customer on success.
 */
customersRoute.delete("/customers/:id", (req, res) => {});

module.exports = { customersRoute };

const { Router } = require("express");
const createCustomerRules = require("./middlewares/create-customers-rules");
const updateCustomerRules = require("./middlewares/update-customers-rules");
/**
 * TODO: 1. Import your CustomerModel.
 */
const CustomerModel = require("./customers-model");

const customersRoute = Router();

/**
 * TODO: 2. Retrieve all customers from the database.
 *    - You can use model methods like `.find()` or `.find({})` to get all documents.
 *    - If no customers exist, respond with an empty array.
 *    - Send the retrieved customers as a JSON response.
 */
customersRoute.get("/customers", async (req, res) => {
    const allCustomers = await CustomerModel.find({});
    if (!allCustomers) {
        res.json([]);
    }else{
        res.json(allCustomers);
    }
});

/**
 * TODO: 3. Retrieve a single customer by ID from the URL parameters.
 *    - Use model functions such as `.findById()`, `.findOne({ _id: id })`, or `.findOne({ id })`.
 *    - If the customer is not found, respond with a 404 status and an appropriate message.
 *    - If found, return the customer as JSON.
 */
customersRoute.get("/customers/:id", async (req, res) => {
    const customerId = req.params.id;
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
        res.status(404).send("Customer not found");
    } else {
        res.status(200).json(customer);
    }
});

/**
 * TODO: 4. Create a new customer using data from the request body.
 *    - Possible model functions: `.create()` or `new CustomerModel()` followed by `.save()`.
 *    - Provide required fields such as name, category, price, and optional description.
 *    - On failure to add, respond with a 500 error.
 *    - On success, return the newly created customer.
 */
customersRoute.post("/customers", createCustomerRules, async (req, res) => {
    try {
        const newCustomer = await CustomerModel.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create customer");
    }
});

/**
 * TODO: 5. Update the customer’s fields.
 *    - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Options for updating include `.findByIdAndUpdate()`, `.updateOne()`, or fetching the document and modifying fields then `.save()`.
 *    - Use `{ new: true }` option if available to return the updated document.
 *    - Handle failure by responding with 500.
 *    - Return the updated customer on success.
 */
customersRoute.put("/customers/:id", updateCustomerRules, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const customerId = req.params.id;
        const updates = req.body;

        // check if customer exists
        const customerExists = await Customer.exists({ _id: customerId });
        if (!customerExists) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // update and return the new document
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            updates,
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(500).json({ message: "Failed to update customer" });
        }

        res.json(updatedCustomer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


/**
 * TODO: 6. Delete the customer.
 *    - Check if the customer exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Delete the customer using model methods such as `.findByIdAndDelete()`, `.deleteOne()`, or `.findOneAndDelete()`.
 *    - On failure, respond with 500.
 *    - Return the deleted customer on success.
 */
customersRoute.delete("/customers/:id", async (req, res) => {
    try {
        const customerId = req.params.id;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(500).json({ message: "Failed to delete customer" });
        }

        res.json(deletedCustomer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { customersRoute };

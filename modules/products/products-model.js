/**
 * TODO: Instructions to define a Product model using Mongoose in products-model.js:
 *
 * 1. Import the 'mongoose' library at the top of the file.
 *
 * 2. Create a new Mongoose schema called productSchema using new mongoose.Schema().
 *
 * 3. Define the following fields in the schema:
 *    - product_name: A required string with a minimum length of 6 characters.
 *    - description: An optional string with a maximum length of 500 characters. Set a default value of an empty string.
 *    - price: A required number that must be greater than or equal to 0.
 *    - category: A required string to classify the product.
 *    - createdAt: A date field that defaults to the current date and time (use Date.now as the default).
 *
 * 4. Use mongoose.model() to create a model named "Product" from the productSchema.
 *
 * 5. Export the model using module.exports so it can be used in other parts of the application.
 */

const mongoose = require('mongoose');

// Define the Schema
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        minlength: 6
    },
    description: {
        type: String,
        maxlength: 500,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
});

// Create the Product Model based on the schema
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
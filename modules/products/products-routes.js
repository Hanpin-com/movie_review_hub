const { Router } = require("express");
const createProductRules = require("./middlewares/create-product-rules");
const updateProductRules = require("./middlewares/update-product-rules");
/**
 * TODO: 1. Import your ProductModel.
 */

const ProductModel = require("./products-model");

const productsRoute = Router();

/**
 * TODO: 2. Retrieve all products from the database.
 *    - You can use model methods like `.find()` or `.find({})` to get all documents.
 *    - If no products exist, respond with an empty array.
 *    - Send the retrieved products as a JSON response.
 */
productsRoute.get("/products", async (req, res) => {
    const allProducts = await ProductModel.find({});
    if (!allProducts) {
        res.json([]);
    }else{
        res.json(allProducts);
    }
});

/**
 * TODO: 3. Retrieve a single product by ID from the URL parameters.
 *    - Use model functions such as `.findById()`, `.findOne({ _id: id })`, or `.findOne({ id })`.
 *    - If the product is not found, respond with a 404 status and an appropriate message.
 *    - If found, return the product as JSON.
 */
productsRoute.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
        res.status(404).send("Product not found");
    } else {
        res.status(200).json(product);
    }
});

/**
 * TODO: 4. Create a new product using data from the request body.
 *    - Possible model functions: `.create()` or `new ProductModel()` followed by `.save()`.
 *    - Provide required fields such as product_name, category, price, and optional description.
 *    - On failure to add, respond with a 500 error.
 *    - On success, return the newly created product.
 */
productsRoute.post("/products", createProductRules, async (req, res) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create product");
    }
});

/**
 * TODO: 5. Update the product’s fields.
 *    - Check if the product exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Options for updating include `.findByIdAndUpdate()`, `.updateOne()`, or fetching the document and modifying fields then `.save()`.
 *    - Use `{ new: true }` option if available to return the updated document.
 *    - Handle failure by responding with 500.
 *    - Return the updated product on success.
 */
productsRoute.put("/products/:id", updateProductRules, async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updates,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update product");
    }
});

/**
 * TODO: 6. Delete the product.
 *    - Check if the product exists using methods like `.findById()`, `.findOne()`, or `.exists()`.
 *    - If not found, respond with 404.
 *    - Delete the product using model methods such as `.findByIdAndDelete()`, `.deleteOne()`, or `.findOneAndDelete()`.
 *    - On failure, respond with 500.
 *    - Return the deleted product on success.
 */
productsRoute.delete("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete product");
    }
});

module.exports = { productsRoute };

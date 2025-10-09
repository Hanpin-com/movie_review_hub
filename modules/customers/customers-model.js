/**
 * TODO: Instructions to define a Customer model using Mongoose:
 *
 * 1. Import the 'mongoose' library at the top of the file.
 *
 * 2. Create a new schema named customerSchema using new mongoose.Schema().
 *
 * 3. Define the following fields in the schema:
 *    - name: A string (optional).
 *    - email: A required string that must be unique across documents.
 *    - phone: A required string.
 *    - address: A string (optional).
 *    - myCart: A reference to another MongoDB document, using mongoose.Schema.Types.ObjectId,
 *              and referring to the "Cart" collection.
 *    - createdAt: A date field that defaults to the current date and time (use Date.now as the default).
 *
 * 4. Create a Mongoose model named "Customer" from this schema.
 *
 * 5. Export the model using module.exports so it can be imported and used in other files.
 */

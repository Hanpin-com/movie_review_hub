const { Router } = require("express");
const CartModel = require("./carts-model");

const cartsRoute = Router();

cartsRoute.get("/carts/:cartID", async (req, res) => {
  const cartID = req.params.id;
  const foundCart = await CartModel.findById(cartID).populate({
    path: "products",
    populate: { path: "item", populate: "Product" },
  });
  if (!foundCart) {
    return res.status(404).send(`Cart with ${cartID} doesn't exist`);
  }
  res.json(foundCart);
});

cartsRoute.post("/carts", async (req, res) => {
  const addedCart = await CartModel.create({});
  if (!addedCart) {
    return res.status(500).send(`Oops! Cart couldn't be added!`);
  }
  res.json(addedCart);
});

module.exports = { cartsRoute };

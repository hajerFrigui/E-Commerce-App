//protect the operation that modify data and make them available only to autheticated users
//verify if the user  send us the token in the req.header : we will repeat it in every route that modify data
//=>put it in middleware function

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validate = require("../validation/productValidator");

router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).json(Products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given id is not found");
  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error, prod } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProd = await new Product({ ...prod }).save();

  res.send(newProd);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;

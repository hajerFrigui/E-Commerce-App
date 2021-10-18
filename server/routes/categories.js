const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Category = require("../models/category");
const validate = require("../validation/categoryValidator");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error, categ } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCateg = await new Category({ ...categ }).save();

  res.send(newCateg);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;

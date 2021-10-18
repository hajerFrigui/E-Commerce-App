const mongoose = require("mongoose");
const Shop = mongoose.model(
  "Shop",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    adress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
);

exports.Shop = Shop;

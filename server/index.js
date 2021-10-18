const config = require("config");
const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const commands = require("./routes/commands");
//const deliveries = require("./routes/deliveries");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

//9bal may5addem app ichouf si private key define 3al pc walla si nn may5addemhech app

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

///*****conx a la BD */
//e-commerce : nom container
//mongo : image
//shop:nom base
//dossier data : tetsab fih les donnés te3i
mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection to database"))
  .catch((e) => console.log("database error: " + e.message));
//if we put the middleware function auth here it will be executed before every route handler
//ornot every endpoint should be protected

app.use(express.json());
app.use("/categories", categories); //kol matla9a"/categoriese esta3mel router ta3 categories
app.use("/commands", commands);
//app.use("/deliveries", deliveries);
app.use("/products", products);
app.use("/users", users);
app.use("/auth", auth);
app.use(express.static("public"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

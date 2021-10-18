//LogIn : validate the user

const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //validate the user mail and pwd(syntax)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate if the user exsit in the db by his email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email ");

  //afte we found the user that has this email we validate his pwd
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  //if he log in we will generate for him a tokenand send it to him
  //jsonWebToken : long string that identifies the user and it show it to the server to be able to use les api
  //the server can see which of the users has the right to use specific api
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;

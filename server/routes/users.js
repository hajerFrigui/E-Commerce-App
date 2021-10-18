const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const validate = require("../validation/userValidator");

router.get("/", auth, async (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
//iraja3li profile te3i
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//add a new user(SignUp)
router.post("/", async (req, res) => {
  //verify that is not found in DB
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  //validate info of the user
  const { error, newUser } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const u = await new User({ ...newUser }).save();

  //create new user and copy values de req.body dans un objet user
  //methode1
  // user = new User({name : req.body.name, email: req.body.email, password: req.body.password});
  //methode2: use methode pick de package lodash de copier les values
  //pick mel req.body les donnes hekom w7ohom fi un objet user

  //hash the pasword then save the user ...don't save it in plein text
  //salt:random string added before or after the pasword
  //the more the number is higher the more the salt is complex end the more it take time to be genereted
  //const salt = await bcrypt.genSalt(10);
  //ser.password = await bcrypt.hash(user.password, salt);

  //wait the server until he save the user
  //await user.save();

  // pick mel objet user ken name wel email wel phone
  // you can use the package joi-password-complexsity for the password: how many lowercase /uppercase/numeric/max/min.....

  //when he sign up boommm he log innnn (without verify the email...)
  //nab3athlou token fel header ta33 res w na3tih esm "x-auth-token"
  const token = u.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(u, ["_id", "name", "email", "phone", "adress", "postalCode"]));
});

module.exports = router;

// tell express that  for every route begin with /users you should this exported router
//we use " app.use('/users',exported router)" dans index.js

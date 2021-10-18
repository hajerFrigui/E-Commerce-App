const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  isAdmin: { type: Boolean, default: false },
  clientCommands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }],
});

//methode of the user shema
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    //the proproties that we put it in the token
    { _id: this._id, isAdmin: this.isAdmin },
    //then generate the token = hash those  proproties using the private key
    config.get("jwtPrivateKey") //private key mawjoud fi dosiier config
    //jwtPrivateKey : the name of our app setting
  );
  //config: node package we store in it secrets(settings of the app) in json files or in var d'envir
  //this package has a prédefini method : config.get
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

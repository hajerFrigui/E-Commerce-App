//pick comme paramer
//public =>imag=>PushSubscriptionOptionslocalhost:400/imag/imag.PushSubscriptionOptionslocalhost
//static method pubic
const Joi = require("joi");
const _ = require("lodash");

module.exports = function validateUser(user) {
  newUser = _.pick(user, [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "postalCode",
    "isAdmin",
  ]);
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    //email() : verify if it  is a valid email
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(8).max(8),
    address: Joi.string(),
    postalCode: Joi.string(),
    isAdmin: Joi.boolean(),
  });

  const { error } = schema.validate(user);
  return { error, newUser };
};

const Joi = require("joi");
const _ = require("lodash");

module.exports = function validateCommand(command) {
  const com = _.pick(command, [
    "creationDate",
    "sendingDate",
    "status",
    "total",
  ]);
  const schema = Joi.object({
    creationDate: Joi.date(),
    sendingDate: Joi.date(),
    status: Joi.string(),
    total: Joi.number(),
  });

  const { error } = schema.validate(command);
  return { error, com };
};

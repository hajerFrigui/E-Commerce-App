const Joi = require("joi");

module.exports = function validateCategory(category) {
  const categ = { ...category };
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  const { error } = schema.validate(category);
  return { error, categ };
};

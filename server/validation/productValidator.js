const Joi = require("joi");
const _ = require("lodash");

module.exports = function validateProduct(product) {
  let prod = _.pick(product, ["name", "price", "stockQuantity", "category"]);
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    imgUrl: Joi.string(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().required(),
    category: Joi.required(),
  });

  const { error } = schema.validate(product);
  return { error, prod };
};

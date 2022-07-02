const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProducSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProducSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  productId: id.required(),
});

module.exports = {
  createProducSchema,
  updateProducSchema,
  getProductSchema,
};

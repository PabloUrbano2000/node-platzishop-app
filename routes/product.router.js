const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProducSchema,
  getProductSchema,
  updateProducSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId: id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      // para que sea capturado por los middlewares
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProducSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:productId',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProducSchema, 'body'),
  async (req, res, next) => {
    try {
      const { productId: id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      // para que sea capturado por los middlewares
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rpta = await service.delete(id);
  res.json(rpta);
});

module.exports = router;

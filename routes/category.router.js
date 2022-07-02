const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 20,
      nombre: 'Ensalada',
    },
    {
      id: 21,
      nombre: 'Mascotas',
    },
  ]);
});

router.get('/:categoryId/products/productId', (req, res) => {
  const { productId, categoryId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;

const { Router } = require('express');
const router = Router();
const categoriesController = require("../../controllers/admin/categories");

// GET /categories
router.get('/', categoriesController.index);

// GET /categories/:id
router.get('/:id', categoriesController.show);

// POST /categories
router.post("/", categoriesController.store)

// PUT /categories/:id
router.put('/:id', categoriesController.update);

// DELETE /categories/:id
router.delete('/:id', categoriesController.destroy);


module.exports = router;
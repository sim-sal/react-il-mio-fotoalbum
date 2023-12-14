const { Router } = require('express');
const router = Router();
const categoriesController = require("../controllers/categories");

// POST /categories
router.post("/", categoriesController.store)

module.exports = router;
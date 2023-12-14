const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

// GET /photos
router.get('/', photosController.index);

// GET /photos/:id
router.get('/:id', photosController.show);

// POST /photos
router.post('/', photosController.store);

// PUT /photos/:id
router.put('/:id', photosController.update);

// DELETE /photos/:id
router.delete('/:id', photosController.destroy);


module.exports = router;
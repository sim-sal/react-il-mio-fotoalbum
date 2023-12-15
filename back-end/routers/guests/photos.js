const express = require('express');
const router = express.Router();
const photosController = require('../../controllers/guests/photos');

// GET /photos
router.get('/', photosController.index);

// GET /photos/:id
router.get('/:id', photosController.show);

module.exports = router;
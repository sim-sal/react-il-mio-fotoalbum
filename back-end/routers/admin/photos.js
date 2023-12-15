const express = require('express');
const router = express.Router();
const multer = require("multer");
const photosController = require('../../controllers/admin/photos');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

// GET /photos
router.get('/', photosController.index);

// GET /photos/:id
router.get('/:id', photosController.show);

// POST /photos
router.post('/',
    multer({ storage: storage }).single("image"),
    photosController.store
);

// PUT /photos/:id
router.put('/:id', photosController.update);

// DELETE /photos/:id
router.delete('/:id', photosController.destroy);


module.exports = router;
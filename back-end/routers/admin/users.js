const { Router } = require('express');
const router = Router();
const usersController = require("../../controllers/admin/users");

// GET /users
router.get('/', usersController.index);

// GET /users/:id
router.get('/:id', usersController.show);

// POST /users
router.post("/", usersController.store)

// PUT /users/:id
router.put('/:id', usersController.update);

// DELETE /users/:id
router.delete('/:id', usersController.destroy);


module.exports = router;
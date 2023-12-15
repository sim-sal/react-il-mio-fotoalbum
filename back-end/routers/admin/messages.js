const { Router } = require('express');
const router = Router();
const messagesController = require("../../controllers/admin/messages");
const authHandler = require("../../middlewares/authHandler")

// GET /messages
router.get('/', authHandler, messagesController.index);

// GET /messages/:id
router.get('/:id', authHandler, messagesController.show);

// POST /messages
router.post("/", authHandler, messagesController.store)

// DELETE /messages/:id
router.delete('/:id', authHandler, messagesController.destroy);


module.exports = router;
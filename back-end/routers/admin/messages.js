const { Router } = require('express');
const router = Router();
const messagesController = require("../../controllers/admin/messages");

// GET /messages
router.get('/', messagesController.index);

// GET /messages/:id
router.get('/:id', messagesController.show);

// POST /messages
router.post("/", messagesController.store)

// DELETE /messages/:id
router.delete('/:id', messagesController.destroy);


module.exports = router;
const { Router } = require('express');
const router = Router();
const messagesController = require("../../controllers/guests/messages");

// POST /messages
router.post("/", messagesController.store)

module.exports = router;
const { Router } = require('express');
const router = Router();
const authController = require("../../controllers/admin/auth");

// POST /auth
router.post("/register", authController.register)
// POST /login
router.post("/login", authController.login)

module.exports = router;
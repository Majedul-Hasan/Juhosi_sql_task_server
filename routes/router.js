const express = require('express');
const {
  authenticateUser,
  createUser,
} = require('../controllers/userController');
const router = express.Router();

router.post('/auth/login', authenticateUser);
router.post('/auth/register', createUser);

module.exports = router;

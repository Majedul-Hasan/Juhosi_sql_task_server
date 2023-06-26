const express = require('express');
const {
  authenticateUser,
  createUser,
  userRole,
} = require('../controllers/userController');
const { verifyJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/auth/login', authenticateUser);
router.post('/auth/register', createUser);
router.get('/auth/role', verifyJWT, userRole);

module.exports = router;

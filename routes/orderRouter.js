const express = require('express');
const { verifyJWT } = require('../middleware/authMiddleware');
const { addOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/order', verifyJWT, addOrder);

module.exports = router;

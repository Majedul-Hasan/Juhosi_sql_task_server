const express = require('express');
const { verifyJWT } = require('../middleware/authMiddleware');
const { addOrder, orderDetail } = require('../controllers/orderController');

const router = express.Router();

router.post('/order', verifyJWT, addOrder);
router.get('/customers', verifyJWT, orderDetail);

module.exports = router;

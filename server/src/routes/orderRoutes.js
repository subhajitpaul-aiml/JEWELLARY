const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      discountPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      couponApplied,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    // Check if user is logged in via token if provided
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aurelia_secret_key');
        userId = decoded.id;
      } catch (err) {
        // Continue as guest
      }
    }

    // Generate unique order number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `AUR-${new Date().getFullYear()}-${randomSuffix}`;

    const order = new Order({
      orderNumber,
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentDetails: {
        transactionId: `TXN-${Date.now()}`,
        status: paymentMethod === 'COD' ? 'PENDING' : 'COMPLETED',
      },
      itemsPrice,
      discountPrice: discountPrice || 0,
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      totalPrice,
      couponApplied,
      orderStatus: 'Confirmed',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id - Get order details
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/user/myorders - Get logged in user's orders
router.get('/user/myorders', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization required' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aurelia_secret_key');
    const orders = await Order.find({ user: decoded.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


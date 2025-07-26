const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Menu = require('../models/MenuItem');

// POST /api/orders — Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, tableNumber } = req.body;

    // Validate input
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items must be a non-empty array.' });
    }

    // Extract menuItem IDs and fetch their data
    const menuItemIds = items.map(item => item.menuItemId);
    const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ message: 'Some menu items are invalid or missing.' });
    }

    // Create populated items array
    const populatedItems = items.map(item => {
      const menuItem = menuItems.find(m => m._id.toString() === item.menuItemId);
      return {
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      };
    });

    // Calculate total
    const total = populatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Save the order
    const newOrder = new Order({
      items: populatedItems,
      tableNumber,
      total
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// GET /api/orders — Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;

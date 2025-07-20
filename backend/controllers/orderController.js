const Order = require("../models/Order");

// Get all orders
exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table items.menuItem staff");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Create order
exports.create = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body, staff: req.user._id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Update order status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};
const MenuItem = require("../models/MenuItem");

// Get all menu items
exports.getAll = async (req, res, next) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Create menu item
exports.create = async (req, res, next) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// Update menu item
exports.update = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// Delete menu item
exports.remove = async (req, res, next) => {
  try {
    const result = await MenuItem.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    next(err);
  }
};
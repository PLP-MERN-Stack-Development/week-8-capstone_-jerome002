const MenuItem = require('../models/MenuItem');

exports.getAllItems = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

exports.addItem = async (req, res) => {
  const newItem = new MenuItem(req.body);
  await newItem.save();
  res.status(201).json({ message: 'Menu item added', item: newItem });
};

exports.updateItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: 'Menu item updated', item });
};

exports.deleteItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu item deleted' });
};

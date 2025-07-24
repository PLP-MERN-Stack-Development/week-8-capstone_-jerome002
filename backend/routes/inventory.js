// routes/inventory.js
const express = require("express");
const router = express.Router();
const InventoryItem = require('../models/Inventory');


// Get all items
router.get("/", async (req, res) => {
  const items = await InventoryItem.find();
  res.json(items);
});

// Add item
router.post("/", async (req, res) => {
  const newItem = new InventoryItem(req.body);
  await newItem.save();
  res.json({ message: "Item added", item: newItem });
});

// Update item
router.put("/:id", async (req, res) => {
  const updatedItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Item updated", item: updatedItem });
});

// Delete item
router.delete("/:id", async (req, res) => {
  await InventoryItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = router;

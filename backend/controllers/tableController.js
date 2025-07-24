const Table = require("../models/Table");

// Get all tables
exports.getAll = async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    next(err);
  }
};

// Update table (reservation/status)
exports.update = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (err) {
    next(err);
  }
};

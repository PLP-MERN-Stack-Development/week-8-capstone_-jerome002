const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  capacity: { type: Number, default: 4 },
  status: { type: String, enum: ["available", "reserved", "occupied"], default: "available" },
  reservation: {
    name: String,
    time: Date,
  },
});

module.exports = mongoose.model("Table", tableSchema);
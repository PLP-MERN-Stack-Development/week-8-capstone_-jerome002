const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "preparing", "served", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
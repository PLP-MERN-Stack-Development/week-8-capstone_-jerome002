const express = require("express");
const Staff = require("../models/staff");
const router = express.Router();


// GET all staffs
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new staff member
router.post("/", async (req, res) => {
  const { name, position, email, phone, salary } = req.body;

  const staffMember = new Staff({ name, position, email, phone, salary });

  try {
    const newStaff = await staffMember.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update staff by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedStaff) return res.status(404).json({ message: "Staff not found" });
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE staff by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

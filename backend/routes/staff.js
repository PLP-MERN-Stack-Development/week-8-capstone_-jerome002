// routes/staff.js
const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

// @route   POST /api/staff
// @desc    Create new staff
router.post('/', async (req, res) => {
  try {
    const { name, role, email, phone, salary } = req.body;

    if (!name || !role || !email || !phone || !salary) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const staff = new Staff({ name, role, email, phone, salary });
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/staff
// @desc    Get all staff
router.get('/', async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/staff/:id
// @desc    Get one staff by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving staff' });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update staff by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, role, email, phone, salary } = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, role, email, phone, salary },
      { new: true, runValidators: true }
    );
    if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' });
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete staff by ID
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting staff' });
  }
});

module.exports = router;

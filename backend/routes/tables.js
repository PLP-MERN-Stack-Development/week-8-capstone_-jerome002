const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const auth = require("../middleware/auth");

router.get("/", tableController.getAll);
router.put("/:id", auth, tableController.update);

module.exports = router;
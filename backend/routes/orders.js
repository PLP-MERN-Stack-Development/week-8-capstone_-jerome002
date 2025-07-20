const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.get("/", auth, orderController.getAll);
router.post("/", auth, orderController.create);
router.put("/:id", auth, orderController.updateStatus);

module.exports = router;
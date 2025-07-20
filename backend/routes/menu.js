const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const auth = require("../middleware/auth");

router.get("/", menuController.getAll);
router.post("/", auth, menuController.create);
router.put("/:id", auth, menuController.update);
router.delete("/:id", auth, menuController.remove);

module.exports = router;
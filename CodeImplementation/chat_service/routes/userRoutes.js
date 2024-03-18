const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  forgot,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/forgot", forgot);

module.exports = router;
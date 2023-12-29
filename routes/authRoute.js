const express = require("express");

//import controller functions
const {
  registerController,
  loginController,
  testController,
} = require("../controller/authController");

//Import MiddleWares
const { requireSignIn } = require("../middlewares/authMiddleware");
//routerObject
const router = express.Router();

//Register Route || Method POST
router.post("/register", registerController);

//Login Route || Method POST
router.post("/login", loginController);

//Test Controller Route || Method GET
router.get("/test", requireSignIn, testController);

module.exports = router;

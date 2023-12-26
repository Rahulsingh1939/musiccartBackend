const express = require('express');

//import controller functions
const {registerController,loginController} = require('../controller/authController')

//routerObject
const router = express.Router();

//Register Route || Method POST
router.post('/register',registerController);

//Login Route || Method POST
router.post('/login',loginController);

module.exports = router;
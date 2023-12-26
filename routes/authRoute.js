const express = require('express');

//import controller functions
const {registerController} = require('../controller/authController')

//routerObject
const router = express.Router();

//Register Route || Method POST
router.post('/register',registerController);

module.exports = router;
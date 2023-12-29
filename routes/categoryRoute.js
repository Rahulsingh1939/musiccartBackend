const express = require('express');
const {createCategory, getCategory, getSingleCategory} = require('../controller/categoryController');

const router = express.Router()

//Create Category Route
router.post('/create-category', createCategory);

// Get All Categories
router.get('/get-category',getCategory);

// Get Single Category
router.get('/get-category/:slug',getSingleCategory);

module.exports = router;
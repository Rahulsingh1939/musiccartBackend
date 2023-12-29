const express = require("express");
const { createProduct, getAll } = require("../controller/productController");

const router = express.Router();

// Create a new Product Route
router.post("/create-product", createProduct);

//Get all Products Route
router.get("/all-products", getAll);

module.exports = router;

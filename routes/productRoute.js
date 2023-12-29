const express = require("express");
const { createProduct, getAll, getProduct } = require("../controller/productController");

const router = express.Router();

// Create a new Product Route
router.post("/create-product", createProduct);

// Get Single Product
router.get("/product/:slug",getProduct);

//Get all Products Route
router.get("/all-products", getAll);

module.exports = router;

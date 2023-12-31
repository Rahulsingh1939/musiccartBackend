const express = require("express");
const {
  createProduct,
  getAll,
  getProduct,
  getFiltered,
  productListController,
  productCountController,
} = require("../controller/productController");

const router = express.Router();

// Create a new Product Route
router.post("/create-product", createProduct);

// Get Single Product
router.get("/product/:slug", getProduct);

//Get all Products Route
router.get("/all-products", getAll);

// Get Filtered Products
router.post("/filtered-products", getFiltered);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);


module.exports = router;

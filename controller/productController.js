const productModel = require("../models/Product");

const createProduct = async (req, res) => {};

//Get All Products
const getAll = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      productCount:products.length,
      message: "All Products List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Getting All Products",
    });
  }
};

module.exports = { createProduct, getAll };

const productModel = require("../models/Product");

const createProduct = async (req, res) => {};

//Get All Products
const getAll = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category");
    res.status(200).send({
      success: true,
      productCount: products.length,
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

const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Got Item Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Getting The Product",
    });
  }
};
module.exports = { createProduct, getAll, getProduct };

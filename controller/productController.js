const productModel = require("../models/product");

const createProduct = async (req, res) => {};

//Get All Products
const getAll = async (req, res) => {
  try {
    const products = await productModel.find({}).limit(8);
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
    const product = await productModel.findOne({ slug: req.params.slug });
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

const getFiltered = async (req, res) => {
  try {
    const { category, brand, color } = req.body;
    const priceRange =req.body.price;
    // const perPage = 8;
    // const page = req.params.page ? req.params.page : 1;
    let args = {};
    if (brand) args.brand = brand;
    if (category) args.category = category;
    if (color) args.color = color;
    if (priceRange) {
      if (priceRange.length === 1) {
        args.price = { $gte: priceRange[0] };
      } else if (priceRange.length === 2) {
        args.price = { $gte: priceRange[0], $lte: priceRange[1] };
      }
    }
    const products = await productModel.find(args).sort({ _id: 1 });
    // .skip((page - 1) * perPage)
    // .limit(perPage);
    res.status(200).send({
      success: true,
      message: "Got Products Successfully",
      productCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Filtering Products",
    });
  }
};

// product count
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
const productListController = async (req, res) => {
  try {
     perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const sortString = req.query.sort;
    let sort={"name":1};
    if(sortString=="name") sort={"name":1};
    else if(sortString=="-name") sort={"name":-1};
    else if(sortString=="price") sort={"price":1};
    else if(sortString=="-price") sort={"price":-1};
    
    if(sortString)  perPage=50;
    const products = await productModel
      .find({})
      .sort(sort)
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { About: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

module.exports = {
  createProduct,
  getAll,
  getProduct,
  getFiltered,
  productCountController,
  productListController,
  searchProductController,
};

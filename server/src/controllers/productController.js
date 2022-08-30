const Product = require("../model/Product");
const { responseJson } = require("../mixins/helper");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(responseJson(200, "Ok", savedProduct));
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(responseJson(200, "Ok", updatedProduct));
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(responseJson(200, "Ok", null));
  } catch (error) {
    res.status(500).json(responseJson(500, "Error", error));
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(responseJson(200, "Ok", product));
  } catch (error) {
    res.status(500).json(responseJson(500, "Error", error));
  }
};

const listProducts = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products = {};

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(responseJson(200, "Ok", products));
  } catch (error) {
    res.status(500).json(responseJson(500, "Error", error));
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
};

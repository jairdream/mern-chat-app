const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Create new product
// @route   POST /api/product
// @access  Public
const createProduct = async (req, res) => {
  const { name, price, content, files } = req.body;

  // Validation
  if (!name || !price) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ error: 'Name and content are required fields' });
  }

  if (!files || !Array.isArray(files)) {
    files = [];
  }

  try {
    const newProduct = new Product({ name, price, content, files });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

// @desc    Get all products
// @route   GET /api/product
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('files', "name path size type");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/product/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('files', "name path size type");
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

// @desc    Update product
// @route   PUT /api/product/:id
// @access  Public
const updateProduct = asyncHandler( async (req, res) => {
  const { name, price, content, files } = req.body;

  if (!name || !price) {
    console.log("Name and content are required fields");
    return res.status(400).json({ error: 'Name and content are required fields' });
  }

  const filesArray = (!files || !Array.isArray(files)) ? [] : files;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, content, files: filesArray },
      { new: true, runValidators: true }
    ).populate('files', "name path size type");
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
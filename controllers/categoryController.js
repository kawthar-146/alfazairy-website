const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const Category = require('../models/categoryModel');
const Dress = require('../models/dressModel');

// @desc    Get categories
// @route   Get /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    const categories = await Category.find({}, '-name_lower_case').sort('name');
    return res.status(200).json({ categories: categories });
  }

  //if an id was provided
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //if id format is valid, if it exists, return it, else, return error, this category does not exist
  const category = await Category.findById(req.params.id).select(
    '-name_lower_case'
  );

  if (!category) {
    res.status(404);
    throw new Error(`the category ${req.params.id} does not exist`);
  }
  //if id exists
  return res.status(200).json({
    status: 200,
    category: await Category.findById({ _id: req.params.id }).populate(
      'coverDress'
    ),
  });
});

// @desc    Add category
// @route   Post /api/collections
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //if category name already exists
  const alreadyExists = await Category.findOne({
    name_lower_case: req.body.name.toLowerCase(),
  }).exec();

  if (alreadyExists) {
    res.status(400);
    throw new Error('This category already exist!');
  }

  const category = await Category.create({
    name: req.body.name,
    name_lower_case: req.body.name.toLowerCase(),
  });

  res.status(200).json(category);
});

// @desc    Update category
// @route   Put /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //check if this id exists
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error('there is no such category!');
  }

  //if no new data
  if (!req.body.name) {
    res.status(400);
    throw new Error('nothing to update!');
  }

  //if id exists
  //if the new name already exists, throw error
  const alreadyExists = await Category.findOne({
    name_lower_case: req.body.name.toLowerCase(),
  }).exec();

  if (alreadyExists) {
    res.status(400);
    throw new Error('This name already exists!');
  }

  //if new doesn't exist, update!
  newData = { ...req.body, name_lower_case: req.body.name.toLowerCase() };

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    newData,
    {
      new: true,
    }
  );

  res.status(200).json({
    message: ' Category was successfully updated',
    data: updatedCategory,
  });
});

// @desc    Delete category
// @route   Delete /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //check if this id exists in categories
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('no such category');
  }

  //if category is used by one or more dresses, don't delete
  const alreadyInUse = await Dress.findOne({
    category: req.params.id,
  })
    .select('id')
    .lean();

  if (alreadyInUse) {
    res.status(400);
    throw new Error(
      'One ore more dresses have this category, you cannot delete it!'
    );
  }
  //if id exists
  await category.remove();
  res.status(200).json({
    status: 200,
    message: 'Category deleted',
    data: await Category.find(),
  });
});

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};

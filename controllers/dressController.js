const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Dress = require('../models/dressModel');
const multer = require('multer');

// @desc    Get dresses
// @route   Get /api/dresses
// @access  Public
const getDresses = asyncHandler(async (req, res) => {
  const dresses = await Dress.find({})
    .populate('Dcollection')
    .populate('category', '-name_lower_case');
  return res.status(200).json({ dresses: dresses });
});

// @desc    Get dresses
// @route   Get /api/dress/:id
// @access  Public
//check if id matches the format
const getDressById = asyncHandler(async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //if id format is valid, if it exists, return it, else, return error, this dress does not exist

  const dress = await Dress.findById(req.params.id);

  if (!dress) {
    res.status(404);
    throw new Error(`the dress ${req.params.id} does not exist`);
  }
  //if id exists
  return res.status(200).json({
    status: 200,
    dress: await Dress.findById({ _id: req.params.id }),
  });
});

// @desc    Get dresses of a collection
// @route   Get /api/dresses/bycollection/:colletion
// @access  Public
const getDressesByCollection = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  const dresses = await Dress.find({});
  return res.status(200).json({
    status: 200,
    dresses: await Dress.find({ Dcollection: req.params.id })
      .populate('Dcollection')
      .populate('category', '-name_lower_case')
      .sort('name'),
  });
});

// @desc    Get one dress of a collection
// @route   Get /api/onedress/bycollection/:colletion
// @access  Public
const getOneDressByCollection = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  const dress = await Dress.findOne({ Dcollection: req.params.id });
  res.status(200).json({ foundOne: dress ? 'true' : 'false' });
});

// @desc    Get one dress of a category
// @route   Get /api/onedress/bycategory/:category
// @access  Public
const getOneDressByCategory = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  const dress = await Dress.findOne({ category: req.params.id });
  res.status(200).json({ foundOne: dress ? 'true' : 'false' });
});

// @desc    Get featured dresses
// @route   Get /api/dresses/featured
// @access  Public
// const getFeaturedDresses = asyncHandler(async (req, res) => {
//   return res.status(200).json({
//     status: 200,
//     dresses: await Dress.find({ featured: true }).select('image'),
//   });
// });

// @desc    Add dress
// @route   Post /api/dresses
// @access  Private
const addDress = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // console.log(req.body);
  // if (
  //   !req.body.name ||
  //   !req.body.price ||
  //   !req.body.Dcollection ||
  //   !req.body.category
  // ) {
  //   res.status(400);
  //   throw new Error('Please add all required fields');
  // }
  // if (isNaN(req.body.price)) {
  //   throw new Error('Please enter a valid price');
  // }
  let newDressValues = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    Dcollection: req.body.Dcollection,
    image: req.file.path,
  };

  if (req.body.description) {
    newDressValues.description = req.body.description;
  }
  const dress = await Dress.create(newDressValues);

  res.status(200).json(dress);
});

// @desc    Update dress
// @route   Put /api/dresses/:id
// @access  Private
const updateDress = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //check if this id exists
  const dress = await Dress.findById(req.params.id);

  if (!dress) {
    res.status(400);
    throw new Error('there is no such dress!');
  }

  //if not, update!
  const body = req.body;
  const valuesToBeUpdated = {};
  if (body.name) {
    valuesToBeUpdated.name = body.name;
  }
  if (body.price) {
    valuesToBeUpdated.price = body.price;
  }
  if (body.category) {
    valuesToBeUpdated.category = body.category;
  }
  if (body.Dcollection) {
    valuesToBeUpdated.Dcollection = body.Dcollection;
  }
  if (body.description) {
    valuesToBeUpdated.description = body.description;
  }

  if (req.file) {
    valuesToBeUpdated.image = req.file.path;
  }

  const updatedDress = await Dress.findByIdAndUpdate(
    req.params.id,
    { $set: valuesToBeUpdated },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ message: 'Dress was successfully updated!', data: updatedDress });
});

// @desc    Delete dress
// @route   Delete /api/dresses/:id
// @access  Private
const deleteDress = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }
  //check if this id exists in dresses
  const dress = await Dress.findById(req.params.id);

  if (!dress) {
    res.status(404);
    throw new Error('no such dress');
  }

  //if id exists
  const fs = require('fs');
  try {
    fs.unlinkSync('./' + dress.image);
    //file removed
  } catch (err) {
    console.error(err);
  }

  await dress.remove();
  res.status(200).json({
    status: 200,
    message: 'Dress deleted',
    data: await Dress.find(),
  });
});

module.exports = {
  getDresses,
  getDressesByCollection,
  getOneDressByCollection,
  getOneDressByCategory,
  addDress,
  updateDress,
  deleteDress,
  getDressById,
};

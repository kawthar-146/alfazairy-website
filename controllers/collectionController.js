const asyncHandler = require('express-async-handler');

const Collection = require('../models/collectionModel');
const Dress = require('../models/dressModel');

// @desc    Get collections
// @route   Get /api/collections
// @access  Public
const getCollections = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    const collections = await Collection.find()
      .populate('coverDress', 'image')
      .sort('year');
    return res.status(200).json({ collections: collections });
  }
});

// @desc    Get collection by id
// @route   Get /api/collection/:id
// @access  Public

const getCollectionById = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //if id format is valid, if it exists, return it, else, return error, this collection does not exist
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    res.status(404);
    throw new Error(`the collection ${req.params.id} does not exist`);
  }
  //if id exists
  return res.status(200).json({
    status: 200,
    collection: await Collection.findById({ _id: req.params.id }),
  });
});

// @desc    Add collection
// @route   Post /api/collections
// @access  Private
const addCollection = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }
  if (
    req.body.year &&
    isNaN(req.body.year || req.body.year < 1000 || req.body.year > 9999)
  ) {
    res.status(400);
    throw new Error('Please enter a valid year');
  }
  const collection = await Collection.create({
    name: req.body.name,
    year: req.body.year,
  });

  res.status(200).json(collection);
});

// @desc    Update collection
// @route   Put /api/collections/:id
// @access  Private
const updateCollection = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //check if this id exists
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    res.status(400);
    throw new Error('there is no such collection!');
  }

  const body = req.body;
  const valuesToBeUpdated = {};
  if (body.name) {
    valuesToBeUpdated.name = body.name;
  }
  if (body.year) {
    valuesToBeUpdated.year = body.year;
  }
  if (body.coverDress) {
    valuesToBeUpdated.coverDress = body.coverDress;
  }

  const updatedCollection = await Collection.findByIdAndUpdate(
    req.params.id,
    { $set: valuesToBeUpdated },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: ' Collection was successfully updated',
    data: updatedCollection,
  });
});

// @desc    Delete collection
// @route   Delete /api/collections/:id
// @access  Private
const deleteCollection = asyncHandler(async (req, res) => {
  //check if id matches the format
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ status: 400, message: 'Not a valid id' });
  }

  //check if this id exists in collections
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    res.status(404);
    throw new Error('no such collection');
  }

  //if collection is used by one or more dresses, don't delete
  const alreadyInUse = await Dress.findOne({
    Dcollection: req.params.id,
  });
  // .select('id')
  // .lean();

  if (alreadyInUse) {
    res.status(400);
    throw new Error(
      'One ore more dresses belong to this collection, you cannot delete it!'
    );
  }
  //if id exists
  await collection.remove();
  res.status(200).json({
    status: 200,
    message: 'Collection deleted',
    data: await Collection.find(),
  });
});

module.exports = {
  getCollectionById,
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
};

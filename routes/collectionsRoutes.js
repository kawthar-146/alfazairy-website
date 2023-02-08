const express = require('express');
const router = express.Router();
const {
  getCollectionById,
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
} = require('../controllers/collectionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/collection/:id?').get(getCollectionById);

router.route('/').get(getCollections);

router.route('/').post(protect, addCollection);

router
  .route('/:id')
  .put(protect, updateCollection)
  .delete(protect, deleteCollection);

module.exports = router;

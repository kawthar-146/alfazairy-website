const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');
const { storage, upload } = require('../middleware/imageUploadMiddleware');

const {
  getDressById,
  getDresses,
  getDressesByCollection,
  getOneDressByCollection,
  getOneDressByCategory,
  addDress,
  updateDress,
  deleteDress,
} = require('../controllers/dressController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getDresses);
router.route('/dress/:id').get(getDressById);
router.route('/bycollection/:id').get(getDressesByCollection);

router.route('/onedress/bycollection/:id').get(getOneDressByCollection);
router.route('/onedress/bycategory/:id').get(getOneDressByCategory);

router
  .route('/')
  .post(
    protect,
    upload.single('image'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Please enter a numeric price')
        .not()
        .isEmpty()
        .isNumeric(),
      check('category', 'Category is required').not().isEmpty(),
      check('Dcollection', 'Collection is required').not().isEmpty(),
    ],
    addDress
  );

router.route('/:id').put(protect, upload.single('image'), updateDress);
router.route('/:id').delete(protect, deleteDress);

module.exports = router;

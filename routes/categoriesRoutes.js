const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { protect } = require('../middleware/authMiddleware');

router.route('/:id?').get(getCategories);

router
  .route('/')
  .post(
    protect,
    [check('name', 'Category name is required').not().isEmpty()],
    addCategory
  );

router
  .route('/:id')
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;

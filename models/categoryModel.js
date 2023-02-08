const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    maxlength: 50,
  },
  name_lower_case: {
    type: String,
    unique: true,
    maxlength: 50,
  },
});

module.exports = mongoose.model('Category', CategorySchema);

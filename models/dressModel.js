const mongoose = require('mongoose');

const DressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  price: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  Dcollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 200,
  },
});

module.exports = mongoose.model('Dress', DressSchema);

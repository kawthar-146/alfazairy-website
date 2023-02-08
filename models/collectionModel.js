const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    maxlength: 50,
  },
  year: {
    type: String,
  },
  coverDress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dress',
  },
});

module.exports = mongoose.model('Collection', CollectionSchema);

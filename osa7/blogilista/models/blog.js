// TITLE: MongoDB schema specification
/* eslint no-param-reassign: 0 */

// import mongoose
const mongoose = require('mongoose');

// specify schema
const blogSchema = mongoose.Schema({
  title: { type: String, required: [true, 'no_title'] },
  author: String,
  url: { type: String, required: [true, 'no_url'] },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export mongoose object based on specified schema
module.exports = mongoose.model('Blog', blogSchema);

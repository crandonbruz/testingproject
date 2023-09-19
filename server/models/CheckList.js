const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// a single item
const checkItemSchema = new Schema({
  text: {
    type: String,
    required: "You need to leave a text!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
});

// a list of items
const checkListSchema = new Schema({
  title: {
    type: String,
    required: "You need to leave a title!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  checkListAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  items: [checkItemSchema],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const CheckList = model("CheckList", checkListSchema);

module.exports = CheckList;

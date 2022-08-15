const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortSDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    featuredImageUrl: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

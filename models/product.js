const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    gymOwnerId: {
      type: String,
      required: true,
    },
    fitnessType: {
      type: String,
      enum: ["gym", "yoga", "zumba", "martialart"],
      default: "gym",
    },
    name: {
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
    address: {
      phoneNumber: String,
      url: String,
      type: Object,
      // required: true,
    },
    price: {
      gold: {
        price: Number,
        duration: Number,
        personalTrainer: Number,
        color: String,
        required: true,
      },
      silver: {
        price: Number,
        duration: Number,
        personalTrainer: Number,
        color: String,
        required: true,
      },
      bronze: {
        price: Number,
        duration: Number,
        personalTrainer: Number,
        color: String,
        required: true,
      },
      platinum: {
        price: Number,
        duration: Number,
        personalTrainer: Number,
        color: String,
        required: true,
      },
      type: Object,
    },
    category: {
      type: String,
      enum: ["male", "female", "unisex"],
      default: "unisex",
    },
    reviews: [
      {
        reviewId: ObjectId,
        text: String,
        // Date: Date.now(),
        stars: Number,
        userName: String,
        userId: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cake: { type: Schema.Types.ObjectId, ref: "Cake", required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
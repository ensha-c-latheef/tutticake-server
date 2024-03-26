const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Product model to whatever makes sense in this case
const cakeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/delicious-vanilla-cake-decorated-with-berries-isolated-transparent-background_191095-11775.jpg?w=996&t=st=1709932157~exp=1709932757~hmac=b0e424149a906560d680aaae177faabd1dea9fe83a48a54d1d2d3081a75b4621",
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    preperationTime: {
      type: Number,
      required: true,
    },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Cake = model("Cake", cakeSchema);

module.exports = Cake;

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Product model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    imageUrl: {
      type: String,
      // default:
      //   "https://www.utrechtmarathon.com/media/11979/lddk-20230521-0083.jpg?anchor=center&mode=crop&width=550&height=400&rnd=133470474780000000",
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    price500g: {
      type: number,
      required: true,
    },
    price1000g: {
      type: number,
      required: true,
    },
    preperationTime: {
      type: number,
      required: true,
    },
    allergens: {
      type: String,
      enum: ["milk", "alcahol", "egg"],
    },
    weight: {
      type: String,
      enum: ["500g", "1000g"],
    },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;

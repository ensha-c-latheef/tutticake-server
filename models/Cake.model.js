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
      // default:
      //   "https://www.utrechtmarathon.com/media/11979/lddk-20230521-0083.jpg?anchor=center&mode=crop&width=550&height=400&rnd=133470474780000000",
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
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
    // vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  {
    timestamps: true,
  }
);

const Cake = model("Cake", cakeSchema);

module.exports = Cake;

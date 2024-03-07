const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    status: {
      type: String,
      enum: ["processing", "completed"],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderDate: { type: Date, default: Date.now },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;

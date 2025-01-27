const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  data: {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    name: String,
    price: Number,
  },
  count: Number,
  status: {
    type: String,
    default: "Recieved",
    enum: ["Cancelled", "Delivered", "Shipped", "Recieved"],
  },
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    shippingDetails: {
      first_name: String,
      last_name: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      pincode: String,
      state: String,
      phone: String,
      email: String,
    },

    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };

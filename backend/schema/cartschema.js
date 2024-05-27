import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  products: [
    {
      productid: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
});
const Cart = mongoose.model("carts", cartSchema);
export default Cart;

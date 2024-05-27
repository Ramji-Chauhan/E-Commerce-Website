import mongoose from "mongoose";
const Orderschema = new mongoose.Schema({
  products: [
    {
      productid: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
});
const Ordered = mongoose.model("ordered", Orderschema);
export default Ordered;

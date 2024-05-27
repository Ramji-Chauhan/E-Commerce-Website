import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  phoneno: Number,
  email: String,
  password: String,
  cartid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  orderedid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ordered",
  },
});
const User = mongoose.model("users", userSchema);
export default User;

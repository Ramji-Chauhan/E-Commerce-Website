import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
  address: String,
});
const Address = mongoose.model("addresses", AddressSchema);
export default Address;

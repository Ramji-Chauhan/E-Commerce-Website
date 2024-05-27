import User from "./schema/userschema.js";
import Cart from "./schema/cartschema.js";
import Address from "./schema/addressschema.js";
import Ordered from "./schema/ordereditems.js";
// const item = {
//   name: "Ramji Chauhan",
//   phoneno: "8493843",
//   email: "ramjichauhan068@gmail.com",
//   password: "3j3oi5",
//   cartid: null,
// };
const DefaultData = async (userData) => {
  try {
    const newuser = await User.create(userData);
    const newcart = await Cart.create({ products: [] });
    const newaddress = await Address.create({ address: "" });
    const newordered = await Ordered.create({ products: [] });
    newuser.cartid = newcart._id;
    newuser.address = newaddress._id;
    newuser.orderedid = newordered._id;
    await newuser.save();
    console.log("Insertion Successfull!");
  } catch (e) {
    console.log(
      "Error occured while inserting/deleting in database ",
      e.message
    );
  }
};
export default DefaultData;

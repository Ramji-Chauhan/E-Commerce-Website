import express from "express";
import Connection from "./db.js";
import dotenv from "dotenv";
import DefaultData from "./default.js";
import cors from "cors";
import User from "./schema/userschema.js";
import jwt from "jsonwebtoken";
import Cart from "./schema/cartschema.js";
import Address from "./schema/addressschema.js";
import stripe from "stripe";
import Ordered from "./schema/ordereditems.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
Connection(USERNAME, PASSWORD);
app.use(cors()); // Apply CORS middleware to all routes

app.use(express.json());
app.listen(PORT, console.log(`Server is running successfully on ${PORT}!!!`));
const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY);
// DefaultData();
app.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    await DefaultData(userData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      //user found
      //generate JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRETTOKEN,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
      // console.log(token);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.get("/user", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log("token ", token);

  try {
    // Verify and decode the token
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRETTOKEN
    );

    // Here, you might fetch user details from the database using the decoded user ID
    // For example, assuming 'User' model exists, and you are retrieving user details from the database
    const user = await User.findById(decoded.id);
    // console.log("Decoded.id: ", decoded.id);
    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        cartid: user.cartid,
        userid: user._id,
      }); // Send back user details
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});
app.post("/cart", async (req, res) => {
  try {
    const { cartid, productid } = req.body;
    const cart = await Cart.findById(cartid);
    if (cart) {
      const prodIndex = cart.products.findIndex(
        (prod) => prod.productid === productid
      );
      if (prodIndex !== -1) {
        cart.products[prodIndex].quantity += 1;
      } else cart.products.push({ productid: productid, quantity: 1 });
      await cart.save();
      res
        .status(200)
        .json({ message: "Product added successfully", items: cart.products });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/cartitems", async (req, res) => {
  try {
    const { cartid } = req.body;
    const cart = await Cart.findById(cartid);
    if (cart) {
      res.status(200).json({ items: cart.products });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/decrementquantity", async (req, res) => {
  try {
    const { cartid, productid } = req.body;
    const cart = await Cart.findById(cartid);
    if (cart) {
      const prodIndex = cart.products.findIndex(
        (prod) => prod.productid === productid
      );
      if (prodIndex !== -1) {
        cart.products[prodIndex].quantity -= 1;
        if (cart.products[prodIndex].quantity == 0) {
          cart.products.splice(prodIndex, 1);
        }
      } else res.status(401).json({ message: "Product not found " });
      await cart.save();
      res.status(200).json({
        message: "Product updated successfully",
        items: cart.products,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/address", async (req, res) => {
  try {
    const { userid, addressval } = req.body;
    console.log("UUUSEER", userid);
    const user = await User.findById(userid);
    if (user) {
      const address = await Address.findById(user.address);
      if (address) {
        if (addressval === null)
          return res.status(200).json({ address: address.address });
        address.address = addressval;
        await address.save();
      } else {
        return res.status(410).json({
          message: "Address isnt linked properly please create new account",
        });
      }
    } else return res.status(401).json({ message: "User not found" });
    return res.status(200).json({ message: "Address updation successfull" });
  } catch (e) {
    console.error(e);
  }
});
app.get("/success", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);

    // Handle the user information as needed
    // console.log("User information:", user);
    if (user) {
      const ordered = await Ordered.findById(user.orderedid);
      const cart = await Cart.findById(user.cartid);
      if (ordered && cart) {
        for (const cartItem of cart.products) {
          // Move the cart item to the order
          ordered.products.push({
            productid: cartItem.productid,
            quantity: cartItem.quantity,
          });
        }
        cart.products = [];
        await ordered.save();
        await cart.save();
        res.redirect(`${CLIENT_URL}/success`);
        return;
      } else {
        res.status(400).json({ message: "CartId or OrderedId not found" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/payment", async (req, res) => {
  try {
    // console.log(req.body.items);
    const userId = req.body.userinfo.userid;
    const lineItems = req.body.items.map((item) => {
      const unitAmount = parseInt(item.price.cost * 100);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      //note that succes calls backend endpoint /success
      success_url: `${SERVER_URL}/success?userId=${userId}`,
      cancel_url: `${CLIENT_URL}/cancel`,
    });
    res.status(200).json({ sessionUrl: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});
app.post("/getmyorders", async (req, res) => {
  try {
    const userid = req.body.userinfo.userid;
    const user = await User.findById(userid);
    const order = await Ordered.findById(user.orderedid);
    if (order) {
      res.status(200).json({ items: order });
    } else {
      res.status(400).json({ message: "Couldn't find your orders" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

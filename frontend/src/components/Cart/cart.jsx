import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../Products/productdata";
import Productsearchlist from "../Products/productsearchlist";
import "./cart.css";
import { message } from "antd";
import { SERVER_URL } from "../../helper/url.js";
function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setitems] = useState([]);
  const [product, setproducts] = useState([]);
  function Alert(mes) {
    message.warning(mes, 1.2);
  }
  useEffect(() => {
    const getitems = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/cartitems`, {
          cartid: location.state?.cartid,
        });
        console.log("cartitems ", response.data.items);
        setitems(response.data.items);
      } catch (e) {
        console.log(e.message);
      }
    };
    getitems();
  }, [location.state?.cartid]);
  useEffect(() => {
    const setProducts = () => {
      const updatedProducts = items.map((itemId) => {
        const foundProduct = products.find(
          (product) => product.id === itemId.productid
        );
        if (foundProduct) {
          return { ...foundProduct, quantity: itemId.quantity };
        }
      });
      // console.log("prodoood", updatedProducts);
      setproducts(updatedProducts);
    };
    setProducts();
  }, [items]);
  const billamount = () => {
    let price = 0;
    if (product) {
      product.map((data) => {
        price += data.price.cost * data.quantity;
      });
    }
    return price.toLocaleString("en-IN");
  };
  const incrementquantity = async (productid) => {
    try {
      const response = await axios.post(`${SERVER_URL}/cart`, {
        cartid: location.state?.cartid,
        productid: productid,
      });
      setitems(response.data.items);
    } catch (e) {
      console.error(e);
    }
  };
  const decrementquantity = async (productid) => {
    try {
      const response = await axios.post(`${SERVER_URL}/decrementquantity`, {
        cartid: location.state?.cartid,
        productid: productid,
      });
      console.log("cart ", response.data.items);
      setitems(response.data.items);
    } catch (e) {
      console.error(e);
    }
  };
  const gotoaddresspage = () => {
    if (product.length === 0) {
      Alert("Please add something to the cart");
      return;
    }
    console.log("Product data before navigating:", product);
    navigate("/address", { state: { product } });
  };
  return (
    <>
      <Navbar />
      <h2 style={{ margin: "3vw", fontSize: "2.4vw" }}>Your Shopping Cart</h2>
      <div className="CartBox">
        <div className="cartsitems">
          {product.length > 0 &&
            product.map((data, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f1f3f6",
                  borderRadius: "2vw",
                  margin: "1vw",
                }}
              >
                <Productsearchlist key={index} {...data} />
                <div className="right">
                  <button
                    className="additem"
                    onClick={() => decrementquantity(data.id)}
                  >
                    -
                  </button>{" "}
                  {data.quantity}{" "}
                  <button
                    className="reduceitem "
                    onClick={() => incrementquantity(data.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="bill">
        <h3>
          Total Bill <span>{`${"₹"}${billamount()}`}</span>
        </h3>
      </div>
      <div className="placeyourorder">
        <button className="pay" onClick={gotoaddresspage}>
          Proceed
        </button>
      </div>
    </>
  );
}
export default Cart;

import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar/navbar";
import "./myorder.css";
import { UserContext } from "../usercontext";
import axios from "axios";
import { products } from "../Products/productdata";
import Productsearchlist from "../Products/productsearchlist";
import { SERVER_URL } from "../../helper/url.js";
function Myorder() {
  const { userinfo, setuserinfo } = useContext(UserContext);
  const [orders, setorders] = useState([]);
  const [product, setproducts] = useState([]);
  useEffect(() => {
    const requestorderdata = async () => {
      console.log(userinfo);
      try {
        const response = await axios.post(`${SERVER_URL}/getmyorders`, {
          userinfo: userinfo,
        });
        setorders(response.data.items.products);
      } catch (e) {
        console.error(e);
      }
    };
    if (userinfo.userid !== null) {
      requestorderdata();
    }
  }, [userinfo]);
  useEffect(() => {
    const setProducts = () => {
      const updatedProducts = orders.map((itemId) => {
        const foundProduct = products.find(
          (product) => product.id === itemId.productid
        );
        if (foundProduct) {
          return { ...foundProduct, quantity: itemId.quantity };
        }
      });
      //   console.log("prodoood", updatedProducts);
      setproducts(updatedProducts);
    };
    setProducts();
  }, [orders]);
  return (
    <>
      <Navbar />
      <div className="boxe" style={{}}>
        <div className="order">
          <p className="text">My Orders</p>
        </div>
        <div className="screenwe">
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
                <div className="status">
                  <p>Status:</p>
                  <p style={{ color: "green" }}>In Transit </p>
                  {data.quantity}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="copyright">© All Rights Reserve to Ramji Chauhan</div>
    </>
  );
}
export default Myorder;

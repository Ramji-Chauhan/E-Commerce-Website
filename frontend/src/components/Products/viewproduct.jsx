import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./viewproduct.css";
import { message } from "antd";
//import { SideBySideMagnifier } from "react-image-magnifiers";
import { SERVER_URL } from "../../helper/url.js";
function Alert(mes) {
  message.warning(mes, 1.4);
}
function Slert(mes) {
  message.success(mes, 1);
}
function ViewProduct() {
  const navigate = useNavigate();
  const [cartid, setcartid] = useState(null);
  const [buynowclicked, setbuynowclicked] = useState(0);
  const location = useLocation();
  console.log("props", location.state);
  function formatprice(price) {
    price = parseInt(price, 10);
    return price.toLocaleString("en-IN");
  }
  const addproducttocart = async () => {
    //check if signed in
    const token = localStorage.getItem("token");
    if (token && token !== null) {
      await axios
        .get(`${SERVER_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setcartid(response.data.cartid);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error.message);
        });
    } else {
      Alert("Please sign in to add to cart");
      return;
    }
  };
  const buynow = async () => {
    try {
      await addproducttocart();
      setbuynowclicked(1);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  useEffect(() => {
    const add = async () => {
      try {
        console.log("Cartid", cartid, location.state?.id);
        await axios
          .post(`${SERVER_URL}/cart`, {
            cartid: cartid,
            productid: location.state?.id,
          })
          .then((res) => {
            console.log("Cart Status: ", res.data.message);
            Slert(res.data.message);
          });
        if (buynowclicked === 1) navigate("/cart", { state: { cartid } });
        setcartid(null);
      } catch (e) {
        console.log("Cant add to cart", e.message);
        Alert(`Cant add to cart,${e.message}`);
      }
    };
    if (cartid !== null) add();
  }, [cartid]);
  return (
    <>
      <Navbar />
      <div className="Box">
        <div className="leftimage">
          {/* <img
            src={location.state?.url}
            key={location.state?.title}
            className="productimage"
          /> */}
          <div className="magnifierimage">
            {/* <SideBySideMagnifier
              // className="productimage"
              imageSrc={location.state?.url}
              largeImageSrc={location.state?.url} // Optional
              overlayBoxOpacity={0.8}
              // switchSides={false}
              // overlayBoxImageSize="2px 2px"
              // alwaysInPlace={true}
            /> */}
          </div>
        </div>
        <div className="rightdata">
          <div className="title">{`${location.state?.title}`}</div>
          <div className="price">
            <div className="mrp">
              ₹{formatprice(`${location.state?.price.mrp}`)}
            </div>
            <div className="cost">
              ₹{formatprice(`${location.state?.price.cost}`)} only
            </div>
          </div>
          <div className="offers">
            <h2>Available Offers</h2>
            <ul className="customlist">
              <li>
                <b>Premium Quality:</b> Handpicked for top-notch performance
              </li>
              <li>
                <b>Exclusive:</b> Only available at MyStore - Limited stock
              </li>
              <li>
                <b>Handcrafted:</b> Carefully crafted by skilled artisans
              </li>
              <li>
                <b>Limited Edition:</b> Rare and unique, a must-have for
                collectors
              </li>
              <li>
                <b>Eco-Friendly:</b> Made from sustainable materials
              </li>
              <li>
                <b>Guaranteed Satisfaction:</b> 100% customer satisfaction or
                your money back
              </li>
              <li>
                <b>Multi-Purpose:</b> Versatile and adaptable for various uses
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Buy">
        <button className="addtocart" onClick={addproducttocart}>
          Add To Cart
        </button>
        <button className="buynow" onClick={buynow}>
          Buy Now
        </button>
      </div>
    </>
  );
}
export default ViewProduct;

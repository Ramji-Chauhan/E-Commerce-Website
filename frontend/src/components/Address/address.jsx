import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import ClipLoader from "react-spinners/RiseLoader";
import { UserContext } from "../usercontext";
import "./address.css";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { SERVER_URL } from "../../helper/url.js";
function Alert(mes) {
  message.error(mes, 2);
}
function Address() {
  const { userinfo, setuserinfo } = useContext(UserContext);
  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const product = location.state;
  useEffect(() => {
    // console.log("PRODUCTTTT", product);
    const getaddress = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/address`, {
          userid: userinfo.userid,
          addressval: address,
        });
        // console.log("Responseee", response);
        setaddress(response.data.address);
      } catch (e) {
        console.error(e);
      }
    };
    if (address === null && userinfo.userid !== null) {
      getaddress();
    }
  }, []);
  const buynow = async () => {
    try {
      if (product.product) {
        const response = await axios.post(`${SERVER_URL}/payment`, {
          items: product.product,
          userinfo: userinfo,
        });
        window.location.href = response.data.sessionUrl;
      } else {
        console.log("Error product.product not defined");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const submiteaddress = async () => {
    if (address === null) return;
    if (address.length < 20) {
      Alert("Address Should be atleast 20 characters long!");
      return;
    } else if (address.length >= 80) {
      Alert("Address Should be less than 80 characters long!");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post(`${SERVER_URL}/address`, {
        userid: userinfo.userid,
        addressval: address,
      });
      console.log(response);
      buynow();
    } catch (e) {
      console.error(e);
      return;
    }
  };
  const handleaddress = (e) => {
    setaddress(e.target.value);
  };
  return (
    <>
      <Navbar />
      {loading === false ? (
        <>
          <div className="wraptitle">
            <div className="addresstitle">Please Confirm Your Address</div>
          </div>
          <div className="address">
            <textarea
              placeholder="Please write your address here"
              value={address}
              onChange={handleaddress}
            ></textarea>
          </div>
          <div className="paynow">
            <button className="paynowbutton" onClick={submiteaddress}>
              Proceed To Payment
            </button>
          </div>
        </>
      ) : (
        <ClipLoader
          color={"#2755af"}
          loading={loading}
          cssOverride={{
            backgroundColor: "#0000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "47vw",
          }}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}
export default Address;

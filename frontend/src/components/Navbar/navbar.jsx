import React, { useEffect, useContext } from "react";
import { useState } from "react";
import Login from "../Login/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { productsearch } from "../Products/searchquery";
import { UserContext } from "../usercontext";
import { SERVER_URL } from "../../helper/url.js";
function Navbar() {
  const { userinfo, setuserinfo } = useContext(UserContext);
  const Navigate = useNavigate();
  const [prevText, newText] = useState("");
  const [cartid, setcartid] = useState(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userid, setuserid] = useState(null);
  useEffect(() => {
    //check if token is stored
    const token = localStorage.getItem("token");

    if (token) {
      // Directly make the API call to fetch user information
      axios
        .get(`${SERVER_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name);
          setcartid(response.data.cartid);
          setuserinfo({
            userid: response.data.userid,
            cartid: response.data.cartid,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error.message);
        });
    }
  }, []);
  useEffect(() => {
    console.log("UserName:", userName);
  }, [userName]);

  //temp
  useEffect(() => {
    console.log("Search", prevText);
  }, [prevText]);

  const handlechange = (event) => {
    newText(event.target.value);
  };
  const openLogin = () => {
    setLoginOpen(true);
  };
  const handlesearch = () => {
    // const productresults = productsearch(prevText);
    // setresult(productresults);
    // console.log("Productsss", productresults, prevText);
    const productresults = productsearch(prevText);
    Navigate("/search", { state: { prevText, productresults } });
  };
  const handleLogin = (login) => {
    // Receive data from the child component and set it in the parent component's state
    setLoginOpen(login);
  };
  const handleCartclick = () => {
    if (cartid === null) {
      openLogin();
    } else {
      //go to cart
      Navigate("/cart", { state: { cartid } });
    }
  };
  const homepageclick = () => {
    Navigate("/");
  };
  const handleenter = (event) => {
    if (event.key === "Enter") {
      handlesearch();
    }
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const gotoorders = () => {
    Navigate("/myorder");
  };
  return (
    <>
      <div className="Navbar">
        <div className="Logo">
          <img src="mystore.png" alt="mystore" onClick={homepageclick}></img>
        </div>
        <div className="Search">
          <input
            type="text"
            value={prevText}
            onChange={handlechange}
            placeholder="Search for goodies!"
            onKeyUp={handleenter}
          ></input>
          <button
            className="Search_button"
            style={{ backgroundImage: 'url("/search_icon.png")' }}
            onClick={handlesearch}
          />
        </div>
        {userName === null ? (
          <div
            className="Login"
            onClick={openLogin}
            style={{ fontSize: "1.3vw" }}
          >
            Login/SignUp
          </div>
        ) : (
          <div
            className="Login"
            style={{ fontSize: "1.3vw" }}
            onClick={gotoorders}
          >
            {userName}'s Orders
          </div>
        )}
        <div
          className="Cart"
          onClick={handleCartclick}
          style={{ fontSize: "1.3vw" }}
        >
          Cart
        </div>
        {userName !== null && (
          <div className="Search">
            <button
              className="Search_button "
              style={{
                backgroundImage: 'url("/logout.png")',
                height: "1.7vw",
                width: "1.7vw",
                borderRadius: "50%",
              }}
              onClick={handlelogout}
            ></button>
          </div>
        )}
      </div>
      <div className="LoginBox">
        {isLoginOpen === true && <Login onLogin={handleLogin} />}
      </div>
    </>
  );
}
export default Navbar;

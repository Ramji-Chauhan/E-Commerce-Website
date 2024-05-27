import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./login.css";
import ClipLoader from "react-spinners/RiseLoader";
import { message } from "antd";
import { SERVER_URL } from "../../helper/url.js";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [loginpageopen, setloginpageopen] = useState(true);
  const [loading, setloading] = useState(false);
  const [Signupdata, setSignupdata] = useState({
    email: "",
    password: "",
    phoneno: "",
    name: "",
  });
  const [Logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  function Alert(mes) {
    message.warning(mes, 1.5);
  }
  const closeLogin = () => {
    // Pass data back to the parent component
    props.onLogin(false);
  };
  const signup = async () => {
    if (Object.values(Signupdata).some((field) => field === "")) {
      Alert("Please fill in all fields");
      return;
    }
    if (Signupdata.name.length > 12) {
      Alert("Your Name should have less than 12 characters");
    }
    //check if phoneno doesnt contain anything other than numbers
    if (!/^\d+$/.test(Signupdata.phoneno) || Signupdata.phoneno.length !== 10) {
      Alert("Please enter a valid phone number");
      return; // Add return statement to stop execution if phone number is not numeric
    }
    //send the data to backend using http
    try {
      setloading(true);
      await axios.post(`${SERVER_URL}/signup`, Signupdata);
      const response = await axios.post(`${SERVER_URL}/login`, Signupdata);
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token in localStorage
      console.log("Login successfull Token stored!!");
      window.location.reload();
    } catch (e) {
      setloading(false);
      console.log("Cannot send http data" + e.message);
    }
    console.log(Signupdata);
  };
  const login = async () => {
    if (Logindata.email === "") {
      Alert("Please enter your email");
      return; // Stop the function execution if password is empty
    } else if (Logindata.password === "") {
      Alert("Please enter your password");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post(`${SERVER_URL}/login`, Logindata);
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token in localStorage
      console.log("Login successfull Token stored!!");
      window.location.reload();
    } catch (e) {
      Alert("INVALID CREDENTIALS");
      setloading(false);
      console.log(e.message);
    }
    console.log(Logindata);
  };
  const handlesignupindputChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...Signupdata, [name]: value });
  };
  const handleloginindputChange = (e) => {
    const { name, value } = e.target;
    setLogindata({ ...Logindata, [name]: value });
  };
  const togglelogin = () => {
    setloginpageopen(!loginpageopen);
  };
  return (
    <>
      <div className="loginbox">
        <img
          src="/cross.png"
          className="cross"
          onClick={closeLogin}
          alt="cross"
        />
        <div className="credentials">
          <div className="email">
            Email
            <input
              placeholder="Enter Your email"
              name="email"
              onChange={
                loginpageopen === true
                  ? handleloginindputChange
                  : handlesignupindputChange
              }
              style={loginpageopen ? { marginLeft: "5vw" } : {}}
            ></input>
          </div>
          <div className="password">
            {loginpageopen === true ? "Password" : "New Password"}
            <input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              onChange={
                loginpageopen === true
                  ? handleloginindputChange
                  : handlesignupindputChange
              }
            ></input>
          </div>
          {loginpageopen === false && (
            <div>
              <div className="phoneno">
                Phone No.
                <input
                  placeholder="Enter Your Phone no."
                  type="tel"
                  name="phoneno"
                  onChange={handlesignupindputChange}
                ></input>
              </div>
              <div className="phoneno">
                Full Name
                <input
                  placeholder="Enter Your Name "
                  name="name"
                  onChange={handlesignupindputChange}
                ></input>
              </div>
            </div>
          )}
          {loading === false && (
            <div className="ButtonDiv">
              <button
                className="Button"
                onClick={loginpageopen === true ? login : signup}
              >
                {loginpageopen === false ? "SignUp" : "Login"}
              </button>
            </div>
          )}
          {loginpageopen === true && loading === false && (
            <div className="NewUser">
              New User?{" "}
              <a href="#" onClick={togglelogin}>
                Signup Now
              </a>
            </div>
          )}
        </div>
      </div>
      {loading && (
        <ClipLoader
          color={"#2755af"}
          loading={loading}
          cssOverride={{
            position: "fixed",
            top: "7vw",
            height: "30vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40vw",
            zIndex: "999",
          }}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}
export default Login;

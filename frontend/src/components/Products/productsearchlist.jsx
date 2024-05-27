import React from "react";
import "./productsearchlist.css";
import { Navigate, useNavigate } from "react-router-dom";
function Productsearchlist(props) {
  const navigate = useNavigate();
  // console.log("Inside Productsearchlist component", props);
  function formatprice(price) {
    return price.toLocaleString("en-IN");
  }
  const gotoproduct = () => {
    navigate("/viewproduct", { state: props });
  };
  return (
    <>
      <div className="productlistbox" onClick={gotoproduct}>
        <img src={props.url} key={props.title} className="prodlistimage" />
        <div className="middletext">
          <div className="productname">{props.title}</div>
          <div className="price">₹ {formatprice(props.price.cost)}</div>
          <div className="productdescription">{props.title}</div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "0vw 2.5vw" }} />
    </>
  );
}
export default Productsearchlist;

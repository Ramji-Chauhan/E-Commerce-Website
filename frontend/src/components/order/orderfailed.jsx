import React from "react";
import Navbar from "../Navbar/navbar";
function OrderFailed() {
  return (
    <>
      <Navbar />
      <div className="success" style={{ height: "30%", margin: "0.2vw" }}>
        <p
          className="text"
          style={{
            fontSize: "3vw",
            fontWeight: "bold",
            textAlign: "center",
            margin: "1.5vw",
          }}
        >
          Oops Looks Like Your Order Didn't Get Placed.
        </p>
        <div
          className="imagewrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vw;",
          }}
        >
          <img
            className="failedimg"
            src="orderfailed.jpg"
            style={{ height: "45vw" }}
          />
        </div>
      </div>
    </>
  );
}
export default OrderFailed;

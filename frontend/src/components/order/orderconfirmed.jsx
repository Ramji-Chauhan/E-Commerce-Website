import React from "react";
import Navbar from "../Navbar/navbar";
function Orderconfirmed() {
  return (
    <>
      <Navbar />
      <div
        className="success"
        style={{
          height: "100%",
          width: "100%",
          margin: "0.2vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className="confirmedimg"
          src="orderconfirmed.png"
          style={{ padding: "1vw", borderRadius: "5vw", width: "100%" }}
        />
      </div>
    </>
  );
}
export default Orderconfirmed;

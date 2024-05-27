import React from "react";
import "./bestmobile.css";
import { mobile_data } from "./mobilesdata";
import { useNavigate } from "react-router-dom";
function BestMobile() {
  const navigate = useNavigate();
  const Redirecttoviewproduct = (data) => {
    // console.log("DATA", data);
    const { id, title, url, price } = data;
    navigate("/viewproduct", { state: { id, title, url, price } });
  };
  return (
    <>
      <div className="outline">
        <div className="Name">Best Mobile</div>
        <div className="screen">
          {mobile_data.map((data, index) => (
            <div className="mobile" key={index}>
              <img src={data.url} onClick={() => Redirecttoviewproduct(data)} />
              <div className="mobile_name">{data.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default BestMobile;

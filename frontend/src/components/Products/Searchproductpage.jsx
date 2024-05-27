import React from "react";
import Navbar from "../Navbar/navbar";
import { useLocation } from "react-router-dom";
import Productsearchlist from "./productsearchlist";
function Searchproductpage() {
  const location = useLocation();
  const Results = location.state?.prevText || location.state?.val;
  return (
    <>
      <div className="products">
        <Navbar />
        <div
          className="Showing"
          style={{ fontWeight: "bold", fontSize: "2.5vw", margin: "1vw" }}
        >
          Showing Results for {Results}
        </div>
        {location.state?.productresults.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "40vw",
            }}
          >
            <img
              src="noresultfound.png"
              className="notfoundimage"
              style={{
                height: "30vw",
                width: "50vw",
              }}
            />
          </div>
        ) : (
          location.state?.productresults.map((data) => (
            <Productsearchlist key={data.name} {...data} />
          ))
        )}
      </div>
    </>
  );
}
export default Searchproductpage;

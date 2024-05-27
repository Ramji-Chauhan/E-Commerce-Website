import React from "react";
import "./categories.css";
import { catdata } from "./categoriesdata";
import { productsearch } from "../Products/searchquery";
import { useNavigate } from "react-router-dom";
function Categories() {
  const Navigate = useNavigate();
  function Redirect(val) {
    const productresults = productsearch(val);
    Navigate("/search", { state: { val, productresults } });
  }
  return (
    <>
      <div className="outline">
        <div className="Name">Categories</div>
        <div className="screen">
          {catdata.map((data, index) => (
            <div className="items" key={index}>
              <img src={data.url} onClick={() => Redirect(data.name)} />
              <div className="mobile_name">{data.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Categories;

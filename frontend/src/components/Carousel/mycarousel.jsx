import React from "react";
import Carousel from "react-multi-carousel";
import "./mycarousel.css";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { productsearch } from "../Products/searchquery";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function MyCarousel() {
  const Navigate = useNavigate();
  function Redirect(val) {
    const productresults = productsearch(val);
    Navigate("/search", { state: { val, productresults } });
  }
  return (
    <Carousel
      responsive={responsive}
      className="carousel"
      swipeable={false}
      draggable={false}
      showDots={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
    >
      <img src="./crousel/slider1.jpg" onClick={() => Redirect("Watch")} />
      <img src="./crousel/slider2.jpg" onClick={() => Redirect("Tshirt")} />
      <img src="./crousel/slider3.jpg" onClick={() => Redirect("Macbooks")} />
      <img src="./crousel/slider4.jpg" onClick={() => Redirect("Redmi 12")} />
    </Carousel>
  );
}
export default MyCarousel;

import React, { useState } from "react";
import "./home.css";
import MyCarousel from "../Carousel/mycarousel";
import BestMobile from "../BestMobile/bestmobile";
import Categories from "../Categories/categories";
import Navbar from "../Navbar/navbar";
function Home() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const handleLogin = (login) => {
    // Receive data from the child component and set it in the parent component's state
    setLoginOpen(login);
  };

  return (
    <div>
      <Navbar />
      <MyCarousel />
      <Categories />
      <BestMobile />
      <div className="copyright">© All Rights Reserve to Sachin Painuly</div>
    </div>
  );
}
export default Home;

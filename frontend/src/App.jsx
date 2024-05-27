import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import Cart from "./components/Cart/cart";
import Searchproductpage from "./components/Products/Searchproductpage";
import ViewProduct from "./components/Products/viewproduct";
import Address from "./components/Address/address";
import UserProvider from "./components/usercontext";
import Orderconfirmed from "./components/order/orderconfirmed";
import OrderFailed from "./components/order/orderfailed";
import Myorder from "./components/Myorders/myorder";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Searchproductpage />} />
            <Route path="/viewproduct" element={<ViewProduct />} />
            <Route path="/address" element={<Address />} />
            <Route path="/success" element={<Orderconfirmed />} />
            <Route path="/cancel" element={<OrderFailed />} />
            <Route path="/myorder" element={<Myorder />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;

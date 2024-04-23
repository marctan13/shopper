import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useShopContext } from "../../contexts/ShopContext";

function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useShopContext();

  const handleShopClick = () => {
    // Check if the current path is already '/'
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      // If not, navigate to the root path
      navigate("/");
    }
  };

  let totalCount = 0;
  for (let key in cartItems) {
    totalCount += cartItems[key];
  }

  return (
    <>
      <div className="navbar">
        <div className="title">
          <h1>Shopper</h1>
        </div>
        <div className="nav-links">
          <Link to="/">
            <span className="link" onClick={handleShopClick}>
              Shop
            </span>
          </Link>
          <Link to="/cart">
            <span className="link">Cart</span>
            <span className="cart-count">{totalCount}</span>
          </Link>
          <span className="link">Menu</span>
        </div>
      </div>
    </>
  );
}

export default NavBar;

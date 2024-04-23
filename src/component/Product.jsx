import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";


function Product({ product }) {
  const{addToCart, cartItems} = useShopContext();
  // console.log(title);
  // Get the quantity of the current product in cartItems
  const cartItemAmount = cartItems[product.id] || 0;

  const handleAddToCart = () => {
      addToCart(product.id); // Pass the unique identifier as the itemId
  };

  return (
    <div className="productCard">
      <Link to={`/product/${product.id}`}>
        <img className="productImg" src={product.images[0]} />
      </Link>
      <div className="title-info">
        <span>{product.title}</span>
        <span>${product.price}</span>
      </div>
      <div className="buttons">
        <Link to={`/product/${product.id}`}>
          <button>Info</button>
        </Link>
        <button onClick={handleAddToCart}>Cart{cartItemAmount > 0 && <>({cartItemAmount})</>}</button>
      </div>
    </div>
  );
}

export default Product;

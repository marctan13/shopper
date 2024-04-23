import React, { useState, useEffect } from "react";
import { useShopContext } from "../../contexts/ShopContext";
import { useParams } from "react-router-dom";
import "./ProductInfo.css";
// import NavBar from "../component/NavBar";

function ProductInfo() {
  const { id } = useParams();
  const { addToCart, removeFromCart, cartItems } = useShopContext();
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    // Fetch product data using the product ID
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        setProductData(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch product data when component mounts or ID changes
  }, [id]);

  // add to cart
  const handleAddToCart = () => {
    if (productData) {
      // Assuming productData has a unique identifier like an ID
      addToCart(productData.id); // Pass the unique identifier as the itemId
    }
  };

  console.log(cartItems);

  return (
    <div className="productInfo">
      <div className="productContainer">
        {/* <NavBar /> */}
        <div className="productCard">
          <img className="productImg" src={productData.thumbnail} />
          <div className="title-info">
            <div className="name-price">
              <span>{productData.title}</span>
              <span>${productData.price}</span>
            </div>
            <div className="buttons">
              <button>Add more</button>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
          <div className="description">
            <p>{productData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

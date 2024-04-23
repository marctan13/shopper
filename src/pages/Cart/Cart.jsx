import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../contexts/ShopContext";
import "./Cart.css";

function Cart() {
  const { cartItems, addToCart, removeFromCart } = useShopContext();
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data using the product ID
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        setProductData(productData.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch product data when component mounts or ID changes
  }, []);

  // Function to filter products based on IDs in cartItems
  const filteredProducts =
    productData &&
    productData.filter((product) =>
      Object.keys(cartItems).includes(String(product.id))
    );

  // Function to render the items in the cart and calculate grand total
  const renderCartItems = () => {
    // Check if cartItems is empty
    if (Object.keys(cartItems).length === 0) {
      return <p>Your cart is empty.</p>;
    }

    // Initialize grand total
    let grandTotal = 0;

    // Map over each item in filteredProducts and render its information
    const cartItemsList =
      filteredProducts &&
      filteredProducts.map((product) => {
        // Calculate total amount for the current product
        const totalAmount = product.price * cartItems[product.id];
        // Add the total amount to grand total
        grandTotal += totalAmount;

        // Return JSX for the current product
        return (
          <div className="cart-item" key={product.id}>
            <li>
              <strong>{product.title}</strong> Quantity: {cartItems[product.id]} Amount: $
              {totalAmount}
            </li>
            <div className="buttons">
              <button onClick={() => addToCart(product.id)}>+</button>
              <button onClick={() => removeFromCart(product.id)}>-</button>
            </div>
          </div>
        );
      });

    // Return JSX for cart items and grand total
    return (
      <div className="list">
        <ul>{cartItemsList}</ul>
        <p>Grand Total: ${grandTotal}</p>
      </div>
    );
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-items">
          <h2>Cart</h2>
          {renderCartItems()}
        </div>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
}
export default Cart;

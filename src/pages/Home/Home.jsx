import React, { useEffect, useState } from "react";
import Product from "../../component/Product";
import Categories from "../../component/Categories";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const products = data.products;

  return (
    <div className="home">
      <div className="home-container">
        {/* <NavBar /> */}
        <Categories data={data} setData={setData} />
        <div className="products">
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

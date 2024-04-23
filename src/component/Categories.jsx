import React, { useState, useEffect } from "react";
import {
  fetchData,
  fetchSmartPhone,
  fetchFragrance,
  fetchSkincare,
  fetchFurniture,
  fetchGroceries,
  fetchLaptops,
} from "../services/apiService";

function Categories({data, setData}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const jsonData = await fetchData();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const handleSmartPhoneClick = async () => {
    try {
      setData([]);
      const data = await fetchSmartPhone();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSkincareClick = async () => {
    try {
      setData([]);
      const data = await fetchSkincare();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFurnitureClick = async () => {
    try {
      setData([]);
      const data = await fetchFurniture();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleGroceriesClick = async () => {
    try {
      setData([]);
      const data = await fetchGroceries();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLaptopClick = async () => {
    try {
      setData([]);
      const data = await fetchLaptops();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFragranceClick = async () => {
    try {
      setData([]);
      const data = await fetchFragrance();
      setData(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => {
            handleSmartPhoneClick();
          }}
        >
          Smartphones
        </li>
        <li
          onClick={() => {
            handleLaptopClick();
          }}
        >
          Laptops
        </li>
        <li
          onClick={() => {
            handleFragranceClick();
          }}
        >
          Fragrances
        </li>
        <li
          onClick={() => {
            handleSkincareClick();
          }}
        >
          Skincare
        </li>
        <li
          onClick={() => {
            handleFurnitureClick();
          }}
        >
          Furniture
        </li>
        <li
          onClick={() => {
            handleGroceriesClick();
          }}
        >
          Groceries
        </li>
      </ul>
    </div>
  );
}

export default Categories;

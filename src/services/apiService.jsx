const fetchData = async () => {
  try {
    const url = "https://dummyjson.com/products";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchSmartPhone = async () => {
  try {
    const url = "https://dummyjson.com/products/category/smartphones";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchFragrance = async () => {
  try {
    const url = "https://dummyjson.com/products/category/fragrances";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchSkincare = async () => {
  try {
    const url = "https://dummyjson.com/products/category/skincare";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchFurniture = async () => {
  try {
    const url = "https://dummyjson.com/products/category/furniture";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchGroceries = async () => {
  try {
    const url = "https://dummyjson.com/products/category/groceries";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchLaptops = async () => {
  try {
    const url = "https://dummyjson.com/products/category/laptops";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchData,
  fetchSmartPhone,
  fetchFragrance,
  fetchSkincare,
  fetchFurniture,
  fetchGroceries,
  fetchLaptops
};

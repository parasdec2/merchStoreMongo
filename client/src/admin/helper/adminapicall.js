// Category calls

// create a category
export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`/api/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// update a category
export const updateCategory = async (categoryId, userId, token, category) => {
  try {
    const response = await fetch(`/api/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// delete a category
export const deleteCategory = async (categoryId, userId, token) => {
  try {
    const response = await fetch(`/api/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// get category by Id
export const getCategory = async (categoryId) => {
  try {
    const response = await fetch(`/api/category/${categoryId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`/api/categories`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// Product calls

// create a product
export const createaProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`/api/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// get all products
export const getProducts = async (filter) => {
  try {
    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    });
    return response.json();
  } catch (err) {
    return err.json();
  }
};

// delete a product
export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(`/api/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// get a product
export const getProduct = async (productId) => {
  try {
    const response = await fetch(`/api/product/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

// update a product
export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(`/api/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllOrders = async (userId, token) => {
  try {
    const response = await fetch(`/api/order/all/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

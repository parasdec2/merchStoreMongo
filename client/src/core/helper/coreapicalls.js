export const getAProduct = (productId) => {
  console.log("Product ID");

  return fetch(`/api/product/${productId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProducts = async (filter) => {
  return fetch(`/api/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  })
    .then((response) => {
      console.log("RESPONE PRODUCTS", response);

      return response.json();
    })
    .catch((err) => {
      console.log("ERROR", err);
      return err.json();
    });
};

export const getCategories = async () => {
  try {
    const response = await fetch(`/api/categories`, { method: "GET" });
    console.log("RES", response);
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getUser = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

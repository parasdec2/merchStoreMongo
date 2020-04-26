export const getUser = (userId, token) => {
  return (
    fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      // .then((cart) => {
      //   console.log("Cart", cart);

      //   var products = [];
      //   cart.map((id, index) =>
      //     getAProduct(id).then((product) => {
      //       products[index] = product;
      //     })
      //   );
      //   return products;
      // })
      .catch((err) => console.log("Error in getting the user", err))
  );
};

export const getAllOrders = (userId, token) => {
  return fetch(`/api/orders/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);

      return response.json();
    })
    .catch((err) => {
      console.log("Error in getting Orders", err);
      return err;
    });
};

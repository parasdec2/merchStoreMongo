export const createOrder = async (userId, token, orderData) => {
  try {
    sessionStorage.removeItem("address");

    const response = await fetch(`/api/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: orderData }),
    });
    return response.json();
  } catch (err) {
    return console.log("ERROR -> ", err);
  }
};

export const updateOrderStatus = (
  userId,
  orderId,
  token,
  status,
  productId
) => {
  return fetch(`/api/order/${orderId}/status/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, productId, orderId }),
  });
};

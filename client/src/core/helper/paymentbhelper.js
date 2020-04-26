export const getmeToken = async (userId, token) => {
  try {
    const response = await fetch(`/api/payment/gettoken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const processPayment = async (userId, token, paymentInfo) => {
  try {
    const response = await fetch(`/api/payment/braintree/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentInfo),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

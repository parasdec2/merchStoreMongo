export const addItemToCart = async (userId, token, cartData) => {
  try {
    console.log("CART DATA_____________", cartData);

    let cart = [];
    let amount = 0;
    if (typeof window !== undefined) {
      if (sessionStorage.getItem("cart")) {
        cart = JSON.parse(sessionStorage.getItem("cart"));
      }
      for (var i = 0; i < cart.length; i++) {
        if (cartData._id.toString() === cart[i]._id.toString()) {
          console.log("CART", cart[i]._id);
          console.log("Product", cartData._id);

          cart[i].count = cart[i].count + 1;
          var pass = true;
          break;
        }
      }
      amount = cartData.price;
      if (!pass) {
        cart.push({
          _id: cartData._id,
          count: 1,
          // amount: cartData.price,
        });
      }
      console.log("cart------", cart);
      console.log("amount------", amount);

      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
    const response = await fetch(`/api/cart/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartAmount: amount, cart: cart }),
    });
    return response;
  } catch (err) {
    return console.log("ERROR -> ", err);
  }
};

export const increaseQuantityFromCart = async (
  userId,
  token,
  product,
  productId
) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (sessionStorage.getItem("cart")) {
      cart = JSON.parse(sessionStorage.getItem("cart"));
    }
    cart.map((cartproduct, i) => {
      if (cartproduct._id === product._id) {
        cartproduct.count = cartproduct.count + 1;
      }
    });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
  return fetch(`/api/cart/update/${userId}/${productId}/inc`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      console.log("REMOVE");

      return response;
    })
    .catch((err) => {
      return console.log("ERROR -> ", err);
    });
};

export const decreaseQuantityFromCart = async (
  userId,
  token,
  product,
  productId
) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (sessionStorage.getItem("cart")) {
      cart = JSON.parse(sessionStorage.getItem("cart"));
    }
    cart.map((cartproduct, i) => {
      if (cartproduct._id === product._id) {
        cartproduct.count = cartproduct.count - 1;
      }
    });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
  return fetch(`/api/cart/update/${userId}/${productId}/dec`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      console.log("REMOVE");

      return response;
    })
    .catch((err) => {
      return console.log("ERROR -> ", err);
    });
};

export const removeItemFromCart = (userId, token, product, productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    cart = JSON.parse(sessionStorage.getItem("cart"));
    console.log("C A R T", cart.length);

    if (cart.length === 1) {
      let cart = [];
      sessionStorage.setItem("cart", JSON.stringify(cart));
      console.log("CART", cart);
    } else {
      cart.map((cartproduct, i) => {
        if (cartproduct._id === product._id) {
          cart.splice(i, 1);
        }
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  return fetch(`/api/cart/update/${productId}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      console.log("PASSED");

      return response;
    })
    .catch((err) => console.log("ERROR -> ", err));
};

export const cartEmpty = async (userId, token) => {
  try {
    if (typeof window !== undefined) {
      sessionStorage.getItem("cart");
      let cart = [];
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
    const response = await fetch(`/api/cart/empty/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return console.log("ERROR -> ", err);
  }
};

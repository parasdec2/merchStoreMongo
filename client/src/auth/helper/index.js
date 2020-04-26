import { getAProduct } from "../../core/helper/coreapicalls";

export const signup = async (user) => {
  try {
    const response = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const authenticate = (data, next) => {
  console.log("AUTHENTICATE DATA", data);
  console.log("CART", data.cart);
  let cart = data.cart;
  var cPrice = 0;
  // if (cart.length > 0) {
  //   cart.map((prod, index) =>
  //     getAProduct(prod._id).then((data) => {
  //       console.log("-********", data);
  //       cPrice = cPrice + data.price * prod.count;
  //       console.log("CART PRICE", cPrice);
  //       // setCartPrice(cPrice);
  //       sessionStorage.setItem("amount", Number(cPrice));
  //       console.log("DONE", cPrice);
  //     })
  //   );
  // } else {
  //   sessionStorage.setItem("amount", Number(cPrice));
  //   console.log("DONE", cPrice);
  // }

  if (typeof window !== "undefined") {
    // sessionStorage.setItem("cart", JSON.stringify(data.cart));
    sessionStorage.setItem("jwt", JSON.stringify(data));
    sessionStorage.setItem("cart", JSON.stringify(data.cart));

    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    sessionStorage.clear();
    next();

    try {
      const response = await fetch(`/api/signout`, {
        method: "GET",
      });
      return console.log("signout success");
    } catch (err) {
      return console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (sessionStorage.getItem("jwt")) {
    return JSON.parse(sessionStorage.getItem("jwt"));
  } else {
    return false;
  }
};

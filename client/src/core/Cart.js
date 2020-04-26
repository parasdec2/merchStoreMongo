import React, { useState, useEffect } from "react";
import "../styles.css";
import CardForCart from "./CardForCart";

import Menu from "./Menu";
import { Link } from "react-router-dom";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { cartEmpty } from "./helper/cartHelper";
import { red } from "@material-ui/core/colors";
import { getUser } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper";

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const Cart = () => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [reload, setReload] = useState(false);

  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState();

  const loadCart = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (sessionStorage.getItem("cart")) {
        return JSON.parse(sessionStorage.getItem("cart"));
      } else {
        sessionStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };

  useEffect(() => {
    setCart(loadCart());
  }, [reload]);

  const loadAllProducts = (product) => {
    console.log("Product Detail", product);
    console.log("Cart", cart);
    // console.log("Total", total);

    return (
      <div className="col-12">
        {cart.map((product, index) => (
          <CardForCart
            key={index}
            products={product._id}
            quantity={product.count}
            removeFromCart={true}
            setReload={setReload}
            reload={!reload}
          />
        ))}
      </div>
    );
  };

  const getAmount = () => {
    getUser(userId, token).then((data) => {
      console.log("DATA>AMOUNT", data.cartAmount);
      setAmount(data.cartAmount);
    });
  };

  const continueShopping = () => (
    <Link className="btn btn-success btn-center" to={`/products`}>
      <span className="">Continue Shopping</span>
    </Link>
  );

  return (
    <div>
      {getAmount()}
      <Menu />
      <div className="jumbotron bg-light  text-center">
        <h2 className="display-4">Your Cart</h2>
        {cart.length > 0 ? (
          <div className="mt-5">{continueShopping()}</div>
        ) : (
          ""
        )}
        {cart.length > 0 ? (
          <ThemeProvider theme={theme}>
            <Button
              className="mt-3"
              variant="contained"
              color="primary"
              onClick={() => {
                cartEmpty(userId, token);
                setReload(!reload);
              }}
            >
              Empty cart
            </Button>
          </ThemeProvider>
        ) : (
          ""
        )}
      </div>
      {cart.length > 0 ? (
        <div>
          <div className="row ml-2">
            <div className="col-2">
              <h4 className=" text-center">Product</h4>
            </div>
            <div className="col-4">
              <h4 className=" text-center">Description</h4>
            </div>
            <div className="col-1">
              <h4 className=" text-center">Price</h4>
            </div>
            <div className="col-3">
              <h4 className=" text-center">Quantity</h4>
            </div>
            <div className="col-1 mr-2">
              <h4 className=" text-center">Total</h4>
            </div>
            {loadAllProducts(cart)}
          </div>
          <div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-2">
                <h4 className=" text-right">Sub Total</h4>
              </div>
              <div className="col-2">
                <h3 className=" text-left ml-4"> $ {amount} </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-9"></div>
              <div className="col-2">
                <Link
                  className="btn btn-block btn-success"
                  to={`/user/cart/checkout/information`}
                >
                  <span className="">CHECK OUT</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className=" text-center">Your Cart is Empty</h4>
          <h4 className=" text-center mt-5">{continueShopping()}</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "../core/helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { getAProduct } from "./helper/coreapicalls";
import Base from "./Base";
import { getUser } from "./helper/coreapicalls";

const Paymentb = ({ setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const [products, setProducts] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [amount, setAmount] = useState();

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  if (sessionStorage.getItem("address")) {
    var {
      first_name,
      last_name,
      addressLine1,
      addressLine2,
      state,
      city,
      pincode,
      phone,
    } = JSON.parse(sessionStorage.getItem("address"));
  }

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: amount,
      };
      console.log("Payment Data", paymentData);

      processPayment(userId, token, paymentData)
        .then((response) => {
          if (response.error) {
            setInfo({ success: false, loading: false });
            console.log("Error in Placing order", response.error);
            alert("Error in Placing order");
          }
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS", response);
          const orderData = {
            products: products,
            shippingDetails: {
              first_name: { first_name },
              last_name: { last_name },
              addressLine1: { addressLine1 },
              addressLine2: { addressLine2 },
              state: { state },
              city: { city },
              pincode: { pincode },
              phone: { phone },
            },
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          console.log("ORDER DATA -> ", orderData);

          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash?");
          });

          setReload(!reload);
          setRedirect(true);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log(error);
        });
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <h3>Your bill is {amount} $</h3>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>LOADING ...</h3>
        )}
      </div>
    );
  };

  const getAmount = () => {
    getUser(userId, token).then((data) => {
      console.log("DATA>AMOUNT", data.cartAmount);
      setAmount(data.cartAmount);
    });
  };

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const getProducts = (cart) => {
    console.log("P CART", cart);

    var deatilsAboutProducts = [];
    // let price = 0;
    cart.map((product, i) => {
      getAProduct(product._id).then((data) => {
        // TODO: check if return keyword will come or not
        // console.log("DATA ------>", { data, count: product.count });
        return (deatilsAboutProducts[i] = { data, count: product.count });
      });
    });
    setProducts(deatilsAboutProducts);
  };

  useEffect(() => {
    getToken(userId, token);
    getAmount();
    getProducts(JSON.parse(sessionStorage.getItem("cart")));
    // getAmount(JSON.parse(sessionStorage.getItem("cart")));
    // getAddress(JSON.parse(sessionStorage.getItem("address")));
  }, []);

  const successMessage = () => {
    if (redirect) {
      return (
        <h4 className="text-success">Thankyou for ordering for our site</h4>
      );
    }
  };

  return (
    <Base title="Payments" description="">
      {showbtdropIn()}
      {successMessage()}
    </Base>
  );
};

export default Paymentb;

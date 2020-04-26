import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
// import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";
import { isAuthenticated } from "../auth/helper/index";
import { getUser } from "../user/helper/userapicalls";
import { getAProduct } from "./helper/coreapicalls";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(true);

  const { user, token } = isAuthenticated();
  const loadCart = (Id, token) => {
    getUser(Id, token)
      .then((data) => {
        console.log("DATA", data);
        if (data.error) {
          console.log("ERROR", data.error);
          return data;
        } else {
          var products = [];
          data.cart.map((id, index) =>
            getAProduct(id).then((product) => {
              products[index] = product;
            })
          );
          console.log("Products", products);
          setProducts(products);
          console.log("Products", products);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCart(user._id, token);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        {products.length > 0 ? loadAllProducts(products) : <h3>No products</h3>}
      </div>
    </Base>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper/index";

export default function Home() {
  const { user: _id } = isAuthenticated();
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        // if (data.error) {
        //   setError(data.error);
        // } else {
        setProducts(data);
      })
      .catch((err) => err.json());
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to T-shirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card id={_id} product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

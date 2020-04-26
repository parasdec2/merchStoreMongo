import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import {
  removeItemFromCart,
  decreaseQuantityFromCart,
  increaseQuantityFromCart,
} from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper/index";
import { getAProduct } from "./helper/coreapicalls";

export default function CardForCart({
  products,
  quantity,
  setReload = (f) => f, //  f => f  is same as function(f){return f}
  reload = undefined,
}) {
  const [product, setProduct] = useState();

  var user_id = isAuthenticated().user._id;
  var token = isAuthenticated().token;

  const getProductDetail = (id) => {
    getAProduct(id).then((productDetail) => {
      console.log("Product----------------", productDetail);
      setProduct(productDetail);
    });
  };
  var cartDescription = product ? product.description : "Default description";
  var productPrice = product ? product.price : 0;

  const showRemoveFromCart = () => {
    return (
      <button
        onClick={() => {
          removeItemFromCart(user_id, token, product, product._id);
          setReload(reload);
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove
      </button>
    );
  };
  const showIncreaseQuantity = () => {
    return (
      <button
        onClick={() => {
          increaseQuantityFromCart(user_id, token, product, product._id);
          setReload(reload);
        }}
        className="btn btn-outline-success mt-2 mb-2"
      >
        +
      </button>
    );
  };
  const showDecreaseQuantity = () => {
    return (
      <button
        onClick={() => {
          decreaseQuantityFromCart(user_id, token, product, product._id);
          setReload(reload);
        }}
        className="btn btn-outline-danger mb-2"
      >
        -
      </button>
    );
  };

  useEffect(() => {
    getProductDetail(products);
  }, [reload]);

  return (
    <div className="row mt-3">
      <div className="col-2 ml-2">
        <ImageHelper productId={products} />
      </div>
      <div className="col-4 my-auto">
        <h4 className=" text-left">{cartDescription}</h4>
        <div className="col-3">{showRemoveFromCart()}</div>
      </div>
      <div className="col-1  my-auto">
        <h4 className=" text-center">$ {productPrice}</h4>
      </div>
      <div className="col-3  my-auto">
        <div className="row">
          <div className="col-3"></div>
          {quantity > 1 ? (
            <div className="col-2 mt-2">{showDecreaseQuantity()}</div>
          ) : (
            ""
          )}
          <div className="col-2 mt-2  my-auto mx-auto">
            <h5>{quantity}</h5>
          </div>
          {quantity < 3 ? (
            <div className="col-2">{showIncreaseQuantity()}</div>
          ) : (
            ""
          )}
          <div className="col-2"></div>
        </div>
        {quantity === 3 ? (
          <div className="row text-danger text-right">
            To order more than 3 qty contact us directly
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="col-1 mr-2  my-auto">
        <h4 className="text-center">$ {productPrice * quantity}</h4>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getAllOrders } from "./helper/userapicalls";
import ImageHelper from "../core/helper/ImageHelper";
import { Paper } from "@material-ui/core";
export default function AllUserOrders() {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("USER ORDERS", data);
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const continueShopping = () => (
    <Link className="btn btn-success btn-center" to="/products">
      <span className="">Continue Shopping</span>
    </Link>
  );

  const buttonClass = (status) => {
    if (status === "Recieved") {
      return "btn btn-info text-dark text-bold text-center";
    }
    if (status === "Delivered") {
      return "btn btn-success text-dark text-bold text-center";
    }
    if (status === "Shipped") {
      return "btn btn-warning text-dark text-bold text-center";
    }
    if (status === "Cancelled") {
      return "btn btn-danger text-dark text-bold text-center";
    }
  };

  return (
    <Base title="Welcome" description="Manage Orders here">
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
      </Link>

      {orders.length > 0 ? (
        <div>
          <div className="row ">
            <div className="col-12">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="row text-center mx-auto  btn  mt-2 mb-2"
                >
                  <Paper className="bg-light" elevation={5}>
                    {order.products.map((product, index) => (
                      <div key={index} className="text-center">
                        <div className="row">
                          <h3 className="row text-left my-auto">
                            <div
                              key={index}
                              className="col-4 mt-2 mb-2 my-auto"
                            >
                              <ImageHelper
                                productId={product.data.product}
                                maxWidth="50%"
                                maxHeight="50%"
                              />
                            </div>
                            <div key={index} className="col-4 my-auto">
                              <div className="row">
                                <h5 className=" text-left">
                                  {product.data.name}
                                </h5>
                              </div>
                              <div className="row">
                                <h5 className=" text-left">
                                  Price ${product.data.price}
                                </h5>
                              </div>
                              <div className="row">
                                <h5 className=" text-left">
                                  Qty. {product.count}
                                </h5>
                              </div>
                              <div className="row">
                                <h5 className=" text-left">
                                  {order.createdAt.toString()}
                                </h5>
                              </div>
                            </div>
                            <div
                              key={index}
                              className="col-4 my-auto mx-auto text-center"
                            >
                              <h6 className={buttonClass(product.status)}>
                                {product.status}
                              </h6>
                            </div>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </Paper>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-dark text-center mt-3">
            You have not ordered anything yet...
          </h4>
          <h4 className="text-white text-center">{continueShopping()}</h4>
        </div>
      )}
    </Base>
  );
}

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import ImageHelper from "../core/helper/ImageHelper";
import { getAllOrders } from "./helper/adminapicall";
import { Paper } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { updateOrderStatus } from "../core/helper/orderHelper";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("ORDERS", data);
        setOrders(data);
        setReload(false);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const goBack = () => (
    <div className="mt-3">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (productId, orderId) => (event) => {
    console.log("EVENT", event);
    console.log("PRODUCT ID", productId);
    console.log("ORDER ID", orderId);

    updateOrderStatus(
      user._id,
      orderId,
      token,
      event.target.value,
      productId
    ).then(() => setReload(true));
  };

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
      {goBack()}
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="row btn  text-center mx-auto mt-2 mb-2">
            <Paper className="text-center col-6 mt-3 bg-warning" elevation={24}>
              <div className="ml-2">
                <div className="row">
                  Name: {order.shippingDetails.first_name}{" "}
                  {order.shippingDetails.last_name}
                </div>
                <div className="row">
                  Phone No: {order.shippingDetails.phone}
                </div>
                <div className="row">
                  Email-Id: {order.shippingDetails.email}
                </div>
                <div className="row">Address</div>
                <div className="row">{order.shippingDetails.addressLine1}</div>
                <div className="row">{order.shippingDetails.addressLine2}</div>
                <div className="row">{order.shippingDetails.city}</div>
                <div className="row">{order.shippingDetails.state}</div>
                <div className="row">{order.shippingDetails.pincode}</div>
              </div>
            </Paper>
            <Paper className="col-12" elevation={3}>
              {order.products.map((product, index) => (
                <div key={index} className="text-center">
                  <div className="row">
                    <h3 className="row text-left my-auto">
                      <div key={index} className="col-4 mt-2 mb-2 my-auto">
                        <ImageHelper
                          productId={product.data.product}
                          maxWidth="50%"
                          maxHeight="50%"
                        />
                      </div>
                      <div key={index} className="col-4 my-auto">
                        <div className="row">
                          <h5 className=" text-left">{product.data.name}</h5>
                        </div>
                        <div className="row">
                          <h5 className=" text-left">
                            Price ${product.data.price}
                          </h5>
                        </div>
                        <div className="row">
                          <h5 className=" text-left">Qty. {product.count}</h5>
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
                          <FormControl>
                            <InputLabel
                              shrink
                              id="demo-simple-select-placeholder-label-label"
                            >
                              Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-placeholder-label-label"
                              id="demo-simple-select-placeholder-label"
                              value={product.status}
                              onChange={handleChange(product._id, order._id)}
                              displayEmpty
                              // className={classes.selectEmpty}
                            >
                              <MenuItem value={"Recieved"}>Recieved</MenuItem>
                              <MenuItem value={"Shipped"}>Shipped</MenuItem>
                              <MenuItem value={"Delivered"}>Delivered</MenuItem>
                              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </h6>
                      </div>
                    </h3>
                  </div>
                </div>
              ))}
            </Paper>
          </div>
        ))
      ) : (
        <div>
          <h4 className="text-dark text-center mt-3">
            No one has ordered anything yet... Keep patience
          </h4>
        </div>
      )}
    </Base>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import ImageHelper from "../core/helper/ImageHelper";
import Base from "../core/Base";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { updateOrderStatus } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

const UpdateOrderStatus = ({ location }) => {
  // const [order, setOrder] = useState(location.state.order);
  const order = location.state.order;
  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-3">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/products">
        Go Back
      </Link>
    </div>
  );
  const goBackDashboard = () => (
    <div className="">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (productId) => (event) => {
    console.log("EVENT", event);

    updateOrderStatus(
      user._id,
      order._id,
      token,
      event.target.value,
      productId
    );
  };

  return (
    <Base title="Welcome" description="Manage Orders here">
      {goBack()}
      {goBackDashboard()}
      <div className="row bg-white">
        <div className="col-10">
          <h4 className="text-left">Status</h4>
        </div>
        <div className="col-2">
          <h4 className="text-left">Status</h4>
        </div>
      </div>
      <div className="row btn  text-center mx-auto mt-2 mb-2">
        <Paper className="ml-5 col-6 mb-2 bg-warning" elevation={24}>
          <div className="ml-2">
            <div className="row">
              Name: {order.shippingDetails.first_name}{" "}
              {order.shippingDetails.last_name}
            </div>
            <div className="row">phone: {order.shippingDetails.phone}</div>
            <div className="row">Address</div>
            <div className="row">{order.shippingDetails.addressLine1}</div>
            <div className="row">{order.shippingDetails.addressLine2}</div>
            <div className="row">{order.shippingDetails.city}</div>
            <div className="row">{order.shippingDetails.state}</div>
            <div className="row">{order.shippingDetails.pincode}</div>
          </div>
        </Paper>
        {order.products.map((product, index) => (
          <div key={index} className="text-center">
            <div className="row">
              <Paper className="col-12 mt-1 mb-1" elevation={3}>
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
                      <h5 className=" text-left">{order.createdAt}</h5>
                    </div>
                  </div>
                  <div
                    key={index}
                    className="col-4 my-auto mx-auto text-center"
                  >
                    <h6 className="btn btn-warning text-grey text-center">
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
                          onChange={handleChange(product._id)}
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
              </Paper>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default UpdateOrderStatus;

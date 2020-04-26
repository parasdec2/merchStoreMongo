import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Base from "../core/Base";

export default function Information() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [redirect, setRedirect] = useState(false);

  const {
    first_name,
    last_name,
    email,
    addressLine1,
    addressLine2,
    state,
    city,
    pincode,
    phone,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    if (typeof window !== undefined) {
      sessionStorage.setItem("address", JSON.stringify(values));
    }
    setRedirect(true);
  };

  const shippingForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              {/* <label className="text-light">First name</label> */}
              <input
                placeholder="First name"
                className="form-control"
                onChange={handleChange("first_name")}
                type="text"
                value={first_name}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Last name</label> */}
              <input
                placeholder="Last name"
                className="form-control"
                onChange={handleChange("last_name")}
                type="text"
                value={last_name}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                placeholder="phone"
                className="form-control"
                onChange={handleChange("phone")}
                type="text"
                value={phone}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                placeholder="email"
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Address</label> */}
              <input
                placeholder="Address"
                className="form-control"
                onChange={handleChange("addressLine1")}
                type="text"
                value={addressLine1}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Appartment, suite, etc</label> */}
              <input
                placeholder="Appartment, suite, etc"
                className="form-control"
                onChange={handleChange("addressLine2")}
                type="text"
                value={addressLine2}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                placeholder="City"
                className="form-control"
                onChange={handleChange("city")}
                type="text"
                value={city}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                placeholder="state"
                className="form-control"
                onChange={handleChange("state")}
                type="text"
                value={state}
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                placeholder="pincode"
                className="form-control"
                onChange={handleChange("pincode")}
                type="text"
                value={pincode}
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Continue to payment
            </button>
          </form>
        </div>
      </div>
    );
  };

  const redirectCheckout = () => {
    if (redirect) {
      return <Redirect to="/user/cart/checkout/payments" />;
    }
  };

  return (
    <Base title="Shipping Details" description="">
      {shippingForm()}
      {redirectCheckout()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

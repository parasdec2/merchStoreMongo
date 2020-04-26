import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to="/user/orders"
              className="nav-link text-success text-center"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <div className="card-header">Personal information</div>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name: </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email: </span> {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin area"
      description="Manage all of Products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
}

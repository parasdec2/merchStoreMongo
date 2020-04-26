import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

export default function UpdateCategory({ match }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-3">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/categories">
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

  const preloadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      // console.log("Data", data);

      if (data.error) {
        setName({ name, error: data.error });
      } else {
        setName(data.name);
      }
    });
  };
  useEffect(() => {
    preloadCategory(match.params.categoryId);
    // console.log("CategoryId", match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //   backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update Category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        {/* <h5 className="text-bold text-center mb-3">Enter the category</h5> */}
        <input
          type="text"
          className="form-control my-3 col-5"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For example Summer"
        />
        <button onClick={onSubmit} className="btn btn-info">
          Update category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title={`Update ${name} here`}
      description=""
      className="container p-4"
    >
      <div className="row bg-white rounded">
        <div className="col md-8 offset-md-2">
          {goBack()}
          {goBackDashboard()}
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
}

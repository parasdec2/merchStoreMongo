import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { Paper } from "@material-ui/core";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4 text-center">All categories</h2>
      <h2 className="text-center">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="text-center">Admin Home</span>
        </Link>
      </h2>
      <h2 className="text-center">Total categories {categories.length}</h2>

      {categories.map((category, index) => {
        return (
          <div key={index} className="text-center mb-1">
            <div className="row">
              <div className="col-4"></div>

              <Paper className="col-4" elevation={3}>
                <h3 className=" text-left">
                  <div class="row">
                    <div className="col-6 text-left">{category.name}</div>
                    <div className="col-3 text-center">
                      <Link
                        className="btn btn-success text-center"
                        to={`/admin/category/update/${category._id}`}
                      >
                        <span className="text-center">Update</span>
                      </Link>
                    </div>
                    <div className="col-3 text-right">
                      <button
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger text-right"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </h3>
              </Paper>

              <div className="col-4"></div>
            </div>
          </div>
        );
      })}
    </Base>
  );
}

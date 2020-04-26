import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { Paper } from "@material-ui/core";
import ImageHelper from "../core/helper/ImageHelper";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    const variables = {
      skip: 0,
    };
    getProducts(variables).then((data) => {
      console.log("Manage Product data", data);

      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4 text-center">All products</h2>
      <h2 className="text-center">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="text-center">Admin Home</span>
        </Link>
      </h2>
      <h2 className="text-center">Total products - {products.length}</h2>
      {products.map((product, index) => (
        <div key={index} className="text-center mb-1">
          <div className="row">
            <div className="col-2"></div>

            <Paper className="col-8 mb-2" elevation={5}>
              <h3 className=" text-left my-auto">
                <div class="row">
                  <div className="col-3 text-left my-auto">
                    <ImageHelper productId={product._id} />
                  </div>
                  <div className="col-3 text-left my-auto">{product.name}</div>
                  <div className="col-3 text-center my-auto">
                    <Link
                      className="btn btn-success text-center my-auto"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="text-center my-auto">Update</span>
                    </Link>
                  </div>
                  <div className="col-3 text-right my-auto">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger text-right my-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </h3>
            </Paper>

            <div className="col-2"></div>
          </div>
        </div>
      ))}
    </Base>
  );
}

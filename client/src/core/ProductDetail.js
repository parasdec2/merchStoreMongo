import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper/index";
import Base from "./Base";
import { Typography, makeStyles } from "@material-ui/core";
import { getAProduct } from "./helper/coreapicalls";

const useStyles = makeStyles({
  title: {
    color: "#4caf50",
  },
  description: {
    color: "#ffb74d",
    marginTop: 5,
  },
  price: {
    color: "rgb(0, 0, 0)",
    marginTop: 5,
  },
  size_qty: {
    color: "#bdbdbd",
    marginTop: 10,
  },
});

export default function ProductDetail({ location, match }) {
  const classes = useStyles();

  const [product, setProduct] = useState({});

  const cartTitle = product.name;
  const cartDescription = product.description;
  const cartPrice = product.price;

  const addToCart = () => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      var user_id = isAuthenticated().user._id;
      var token = isAuthenticated().token;

      addItemToCart(user_id, token, product);
    } else {
      alert("You must be Logged In to add a product to your cart");
    }
  };

  const showAddToCart = () => (
    <button
      onClick={addToCart}
      className="btn btn-block btn-outline-success mt-2 mb-2"
    >
      Add to Cart
    </button>
  );

  // const loadproduct = () => {
  //   return(
  //     <div className="col-7 text-left">
  //         <Typography variant="h3" className={classes.title} component="h3">
  //           {cartTitle}
  //         </Typography>
  //         <Typography variant="h5" className={classes.price} component="h5">
  //           $ {cartPrice}
  //         </Typography>
  //         <Typography
  //           variant="h6"
  //           className={classes.description}
  //           component="h6"
  //         >
  //           {cartDescription}
  //         </Typography>
  //         <Typography variant="h5" className={classes.size_qty} component="h5">
  //           <div className="row">
  //             <div className="col-6 ml-2">Color</div>
  //             <div className="col-4">Size</div>
  //           </div>
  //         </Typography>
  //         <div className="row">
  //           <div className="col-10 ml-2">{showAddToCart()}</div>
  //         </div>
  //       </div>

  //   )
  // }

  const getProductDetails = () => {
    getAProduct(match.params.productId).then((data) => setProduct(data));
  };

  useEffect(() => {
    if (!location.state) {
      getProductDetails();
    } else {
      setProduct(location.state.product);
    }
  }, []);

  return (
    <Base title="" description="">
      <div className="row mt-5 ml-5">
        <div className="col-5">
          <ImageHelper productId={match.params.productId} />
        </div>
        <div className="col-7 text-left">
          <Typography variant="h3" className={classes.title} component="h3">
            {cartTitle}
          </Typography>
          <Typography variant="h5" className={classes.price} component="h5">
            $ {cartPrice}
          </Typography>
          <Typography
            variant="h6"
            className={classes.description}
            component="h6"
          >
            {cartDescription}
          </Typography>
          <Typography variant="h5" className={classes.size_qty} component="h5">
            <div className="row">
              <div className="col-6 ml-2">Color</div>
              <div className="col-4">Size</div>
            </div>
          </Typography>
          <div className="row">
            <div className="col-10 ml-2">{showAddToCart()}</div>
          </div>
        </div>
      </div>
    </Base>
  );
}

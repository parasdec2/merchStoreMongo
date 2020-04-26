import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import {
  Card,
  makeStyles,
  Typography,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "#ffffff",
    border: 0,
    borderRadius: 3,
    boxShadow: " 3px 5px 2px rgba(0, 0, 0, 0.26)",
    color: "rgb(0, 0, 0)",
    // height: 48,
    padding: "0 30px",
  },
});

export default function Cards({ product }) {
  const classes = useStyles();
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartPrice = product ? product.price : "Default";

  const addToCart = () => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      var user_id = isAuthenticated().user._id;
      var token = isAuthenticated().token;

      addItemToCart(user_id, token, product);
    } else {
      alert("You must be Logged In to add a product to your cart");
    }
  };

  return (
    <Link
      to={{ pathname: `/product/${product._id}`, state: { product: product } }}
      style={{ textDecoration: "inherit" }}
    >
      <Card className={classes.root} raised={true}>
        <CardActionArea>
          <div className="text-dark">
            <div className="col-12 ">
              {/* {getARedirect(redirect)} */}
              <ImageHelper productId={product._id} />
              <Typography variant="h6" component="h6">
                {cartTitle}
              </Typography>
              {/* <p className="lead bg-success font-weight-normal text-wrap">
            </p> */}
              <h6 className="text-muted text-center">$ {cartPrice}</h6>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}

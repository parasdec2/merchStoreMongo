import React from "react";

import { CardMedia } from "@material-ui/core";

export default function ImageHelper({ productId, maxHeight, maxWidth }) {
  var height = maxHeight ? maxHeight : "100%";
  var width = maxWidth ? maxWidth : "100%";
  const imageUrl = productId ? (
    `/api/product/photo/${productId}`
  ) : (
    <h4>LOADING...</h4>
  );
  // `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    // <div className="rounded border border-success p-2">

    <CardMedia
      component="img"
      alt="pro"
      height={height}
      width={width}
      image={imageUrl}
    />
    // <img
    //   src={imageUrl}
    //   alt="product"
    //   style={{
    //     maxHeight: height,
    //     maxWidth: width,
    //     alignContent: alignmentNew,
    //   }}
    // />
  );
}

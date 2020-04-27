const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  console.log("ORDER -> ", req.body.order.products);
  products = [];
  req.body.order.products.forEach((product) => {
    products.push({
      data: {
        product: product.data._id,
        name: product.data.name,
        price: product.data.price,
      },
      count: product.count,
    });
  });

  req.body.order.user = req.profile;
  const order = new Order({
    products: products,
    transaction_id: req.body.order.transaction_id,
    amount: req.body.order.amount,
    shippingDetails: {
      first_name: req.body.order.shippingDetails.first_name.first_name,
      last_name: req.body.order.shippingDetails.last_name.last_name,
      addressLine1: req.body.order.shippingDetails.addressLine1.addressLine1,
      addressLine2: req.body.order.shippingDetails.addressLine2.addressLine2,
      city: req.body.order.shippingDetails.city.city,
      pincode: req.body.order.shippingDetails.pincode.pincode,
      state: req.body.order.shippingDetails.state.state,
      phone: req.body.order.shippingDetails.phone.phone,
      email: req.body.order.shippingDetails.email.email,
    },
    user: req.body.order.user._id,
    status: req.body.order.status ? req.body.order.status : "Recieved",
  });
  console.log("order", order);

  order.save((err, order) => {
    if (err) {
      console.log(
        "E R R O R-----------------------------------------------------------------------",
        err
      );
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .sort([["createdAt", "desc"]])
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB",
        });
      }

      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(ProductCart.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  console.log("Status", req.body);
  status = req.body.status;
  // products = req.order.products;
  // console.log("DETAILS^^^^^^^^^^^^^^^^", products);

  Order.findByIdAndUpdate(req.body.orderId).exec((err, order) => {
    if (err) {
      console.log("ERROR$$$$$$$$$$$$$$$$$$$$", err);

      return res.status(400).json({
        error: "NO order found in DB",
      });
    }
    console.log("ORDER**************************", order);
    order.products.map((prod, index) => {
      console.log("PRODUCT ID", prod._id);
      console.log("REQ ID", req.body);

      if (prod._id == req.body.productId) {
        console.log("STATUS", status);

        prod.status = status;
      }
    });
    console.log("ORDER^^^^^^^^^^^^^^^^^^^^^^^^^^^", order.products);
    let updateOrderData = [];
    updateOrderData = order.products;

    Order.updateOne(
      { _id: req.body.orderId },
      { products: updateOrderData }
    ).exec((err, order) => {
      if (err) {
        console.log("ERROR$$$$$$$$$$$$$$$$$$$$", err);

        return res.status(400).json({
          error: "NO order found in DB",
        });
      }
      res.json(order);
    });
  });
  // res.json(order);
};

// Order.populate("prodcuts").updateOne(
//   // { _id: req.body.productId },
//   {
//     $and: [
//       { _id: req.body.orderId },
//       { products: { $in: [req.body.productId] } },
//     ],
//   },
//   { status: status },
//   (err, order) => {
//     if (err) {
//       console.log("ERROR", err);

//       return res.status(400).json({
//         error: "Cannot update order status",
//       });
//     }
//     console.log("ORDER**************************", order);

//     res.json(order);
// //   }
// );

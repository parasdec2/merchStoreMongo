const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User not found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res, next) => {
  req.profile.salt = undefined; // to hide these values from user browser
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  console.log("RESPONSE --> ", req.profile);
  return res.json(req.profile);
};

// exports.getAllUsers = (req, res) => {
//   User.find().exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "No Users found"
//       });
//     }
//     return res.json(req.profile);
//   });
// };

exports.updateUser = (req, res) => {
  //console.log("USER ", req.body);

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are authorized to update info",
        });
      }
      user.salt = undefined; // to hide these values from user browser
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json(user);
    }
  );
};

exports.userCartList = (req, res) => {
  Cart.find({ user: req.body._id }).exec((err, cart) => {
    if (err) {
      return res.status(400).json({
        eroor: "No Cart in this account",
      });
    }
    return res.json(cart);
  });
};

exports.pushProductInCartList = (req, res, next) => {
  let cart = [];
  console.log(
    "******************************************************************************************************************",
    req.body
  );
  // console.log("OLD------", req.profile);
  cart = req.body.cart;
  amount = req.body.cartAmount;
  amount = amount.toFixed(2);
  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { cart: cart, $inc: { cartAmount: +amount } },
    { new: true },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      console.log(
        "---------------------------------------------------------------------------------------------------",
        cart
      );

      next();
      // console.log("UPDATED------", req.profile.cart);
    }
  );
};

exports.increaseProductQuantity = (req, res, next) => {
  let cart = [];
  let amount = 0;
  console.log("PARAMS", req.params);
  console.log(
    "********************************************************************",
    req.body
  );

  for (var i = 0; i < req.profile.cart.length; i++) {
    if (req.profile.cart[i]._id == req.params.productId) {
      console.log("CART", req.profile.cart[i]);
      // console.log("TO BE REMOVED", req.profile.cart[i]);
      req.profile.cart[i].count = req.profile.cart[i].count + 1;
      // console.log("UPDATED", cart);
      amount = req.body.price;
      amount = amount.toFixed(2);
      console.log(
        "AMOUNT ________________________________________________________________________________________________",
        amount
      );

      break;
    }
  }
  cart = req.profile.cart;

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { cart: cart, $inc: { cartAmount: +amount } },
    { new: true },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }

      next();
    }
  );
};

exports.decreaseProductQuantity = (req, res, next) => {
  let cart = [];
  let amount = 0;
  console.log("PARAMS", req.params);
  // console.log("COURSE Id", req.body._id);

  for (var i = 0; i < req.profile.cart.length; i++) {
    if (req.profile.cart[i]._id == req.params.productId) {
      console.log("CART", req.profile.cart[i]);
      // console.log("TO BE REMOVED", req.profile.cart[i]);
      req.profile.cart[i].count = req.profile.cart[i].count - 1;
      amount = req.body.price;
      amount = amount.toFixed(2);
      console.log(
        "AMOUNT ________________________________________________________________________________________________",
        amount
      );

      // console.log("UPDATED", cart);
      break;
    }
  }
  cart = req.profile.cart;

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { cart: cart, $inc: { cartAmount: -amount } },
    { new: true },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }

      next();
    }
  );
};

exports.removeProductFromCartList = (req, res, next) => {
  let cart = [];
  let amount = 0;
  console.log("LENGTH", req.profile.cart);
  console.log("COURSE Id", req.body);
  if (req.profile.cart.length === 1) {
    cart = [];
  } else {
    for (var i = 0; i < req.profile.cart.length; i++) {
      if (req.profile.cart[i]._id == req.body._id) {
        console.log("TO BE REMOVED", req.profile.cart[i]);
        req.profile.cart.splice(i, 1);
        amount = req.body.price * req.profile.cart[i].count;
        amount = amount.toFixed(2);

        console.log("UPDATED", req.profile.cart);
        break;
      }
    }
    cart = req.profile.cart;
  }

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { cart: cart, $inc: { cartAmount: -amount } },
    { new: true },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }

      next();
    }
  );
};

exports.emptyCart = (req, res, next) => {
  let cart = [];
  let cartAmount = 0;
  console.log(
    "CART************************************-------------------------------------------------------"
  );

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { cart: cart, cartAmount: cartAmount },
    { new: true },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      console.log(
        "CART************************************-------------------------------------------------------",
        cart
      );
    }
  );
};

exports.userPurchaseList = (req, res) => {
  console.log(Order.Order);

  Order.Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          eroor: "No Order in this account",
        });
      }

      return res.json(order);
    });
};

// TODO: add individual product price
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  console.log(
    "PRODUCT FOR USER ----> ",
    req.body.order.shippingDetails.first_name
  );

  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product.data._id,
      name: product.data.name,
      description: product.data.description,
      category: product.data.category,
      quantity: product.count,
      individualPrice: product.data.price,
      amount: product.data.price * product.count,
      transaction_id: req.body.order.transaction_id,
      shippingDetails: {
        first_name: req.body.order.shippingDetails.first_name,
        last_name: req.body.order.shippingDetails.last_name,
        addressLine1: req.body.order.shippingDetails.addressLine1,
        addressLine2: req.body.order.shippingDetails.addressLine2,
        city: req.body.order.shippingDetails.city,
        pincode: req.body.order.shippingDetails.pincode,
        state: req.body.order.shippingDetails.state,
        phone: req.body.order.shippingDetails.phone,
      },
    });
  });

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

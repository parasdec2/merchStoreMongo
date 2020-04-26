const express = require("express");
const router = express.Router();
const { getProductById } = require("../controllers/product");
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  userPurchaseList,
  userCartList,
  pushProductInCartList,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCartList,
  emptyCart,
  getAllUserOrders,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// router.get("/users", getAllUsers)

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.put(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

router.put("/cart/user/:userId", isSignedIn, isAuthenticated, userCartList);

router.post("/cart/empty/:userId", isSignedIn, isAuthenticated, emptyCart);

router.post(
  "/cart/:userId",
  isSignedIn,
  isAuthenticated,
  pushProductInCartList
);

router.post(
  "/cart/update/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  removeProductFromCartList
);
router.post(
  "/cart/update/:userId/:productId/dec",
  isSignedIn,
  isAuthenticated,
  decreaseProductQuantity
);
router.post(
  "/cart/update/:userId/:productId/inc",
  isSignedIn,
  isAuthenticated,
  increaseProductQuantity
);

module.exports = router;

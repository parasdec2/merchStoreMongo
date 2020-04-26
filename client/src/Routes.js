import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Information from "./user/Shipping";
import PaymentB from "./core/Paymentb";

import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Products from "./core/Products";
import ProductDetail from "./core/ProductDetail";
import AllUserOrders from "./user/AllUserOrders";
import AllOrders from "./admin/AllOrders";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/products" exact component={Products} />
        <Route path="/product/:productId" exact component={ProductDetail} />
        <PrivateRoute path="/user/cart" exact component={Cart} />
        <PrivateRoute
          path="/user/cart/checkout/information"
          exact
          component={Information}
        />
        <PrivateRoute
          path="/user/cart/checkout/payments"
          exact
          component={PaymentB}
        />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/orders" exact component={AllUserOrders} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute path="/admin/orders" exact component={AllOrders} />
        {/* <AdminRoute
          path="/admin/order/update/:orderId"
          exact
          component={OrderDetails}
        /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types.ObjectId;

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // destructure the fields
    // if we don't do this we have to use fields.name, fields.price, etc
    // by destructuring we can directly use name, price, etc.
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        // approx 3MB.. it is 3000000 Bytes
        return res.status(400).json({
          error: "File size to big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to DB
    product.save((err, product) => {
      if (err) {
        console.log("Error in saving the product", err);

        return res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  // console.log("Body", req.body);
  // console.log("Product", req.product);

  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Delete Controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct,
    });
  });
};

// Update Controllers
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // Updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        // approx 3MB.. it is 3000000 Bytes
        return res.status(400).json({
          error: "File size to big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });
};

// product listing
exports.getAllProducts = (req, res) => {
  console.log(req.body);

  let limit = req.body.limit ? parseInt(req.body.limit) : 100000;
  let skip = parseInt(req.body.skip);
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let order = req.body.order ? req.body.order : "asc";

  let term = req.body.searchTerm;
  // console.log(req.body);

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lt: req.body.filters[key][1],
        };
      } else if (key === "category") {
        var cate = [];
        req.body.filters[key].forEach(function (string, index) {
          cate[index] = new Mongoose.Types.ObjectId(string);
        });
        findArgs[key] = { $in: cate };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log("ARGS", findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .select("-photo") // -ve sign means except photo everything
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "No product found",
            err,
          });
        }
        res.json(products);
      });
  } else {
    Product.find(findArgs)
      .select("-photo") // -ve sign means except photo everything
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "No product found",
          });
        }
        console.log("PRODUCTS", products);

        res.json(products);
      });
  }
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

// Middleware for updating the stock
exports.updateStock = (req, res, next) => {
  console.log("ORDER ----> ", req.body.order);

  let myOperations = req.body.order.products.map((prod) => {
    console.log("PRODUCT ---> ", prod.data);

    return {
      updateOne: {
        filter: { _id: prod.data._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation failed",
      });
    }
    next();
  });
};

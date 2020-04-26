const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

// DB Connections
mongoose
  .connect("mongodb://localhost/tshirt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("---------------DB CONNECTED---------------");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client/public/index.html"), function (
//     err
//   ) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

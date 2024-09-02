const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const AuthRoute = require('./routes/AuthRouter')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongo db connection

mongoose
  .connect(
    "mongodb+srv://khalifahnur1095:GDGvBzdF8fostkX3@pos-cluster.lnle8cj.mongodb.net/POS?retryWrites=true&w=majority&appName=POS-Cluster"
  )
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((error) => {
    console.log("MongoDB connection Error", error);
  });

// app routes

app.use("/api/auth", AuthRoute);
//app.use("/api/products", productRoutes);

//event listener of connection

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("listening in port 3002");
});

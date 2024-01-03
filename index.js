//MY IMPORTS
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

//Environmental Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

//
const healthRoute = require("./routes/healthRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

//Global MiddleWares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(cors());


app.get("/", (req, res) => {
  res.json({ status: "Success", message: "Everything Fine" });
});

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/health", healthRoute);
app.use("/api/v1/product", productRoute);

//APP LISTENING ON PORT
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    console.log("Error Occured");
  } else {
    console.log(`Server Up On ${PORT}`);
  }
});

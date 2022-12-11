const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
app.use(express.json());

//Route imports
const product = require("./routes/productRoutes");

app.use("/api/v1", product);
// app.use("/", product);

// userRotue import
const user = require("./routes/userRoutes");

//User Routes
app.use("/api/v1", user);

//Middleware of errors
app.use(errorMiddleWare);

module.exports = app;

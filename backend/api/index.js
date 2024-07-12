require("dotenv").config();

const express = require("express");
const reviews = require("../routes/reviewsRouter");
const users = require("../routes/userRouter");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/reviews", reviews);
app.use("/api/user", users);

//404
app.use((req, res, next) => {
  res.status(404).send('Sorry, Not Found');
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(
        "connect to db & listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

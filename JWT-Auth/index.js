const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postsRoute = require('./routes/posts')

// Allows us to use .env file
dotenv.config();

// Connect to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });


// Middlewares
app.use(express.json())
// User routes middleware
app.use("/api/user", authRoute);
app.use("/api/posts",postsRoute)



// Running server at port 3000
app.listen(3000, () => {
  console.log("Server is running");
});

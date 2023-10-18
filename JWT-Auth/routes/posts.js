const express = require("express");
const router = express.Router();
const verify = require("./validateToken");

// Private Routes 

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "New Post",
      Description: "Random Text",
    },
  });
});

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Post = require("../models/Post");
require("dotenv").config();

const privateKey = `${process.env.Express_PrivateKey}`;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.patch("/update/:id", function (req, res, next) {
  console.log(req.body.completeDate);
  console.log(req.body.done);

  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { completeDate: req.body.completeDate, done: req.body.done },

    function (err, post) {
      console.log("Updating Post " + req.params.id);
      res.json(post);
    }
  );
});

module.exports = router;

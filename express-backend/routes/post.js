const express = require("express");
const jwt = require("jsonwebtoken");
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

router.post("/", async function (req, res) {
  const post = new Post({
    listItem: req.body.listItem,
    description: req.body.description,
    author: req.payload.id,
    done: req.body.done,
    createDate: req.body.createDate,
    completeDate: req.body.completeDate,
  });
  return post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        _id: savedPost._id,
        listItem: savedPost.listItem,
        description: savedPost.description,
        author: savedPost.author,
        done: savedPost.done,
        createDate: savedPost.createDate,
        completeDate: savedPost.completeDate,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Something is went wrong." });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json({ posts: posts });
});

router.get("/:id", async function (req, res, next) {
  const post = await Post.findOne().where("_id").equals(req.params.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json(post);
});

module.exports = router;

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
// router.patch("/patch/:id", function (req, res, next) {
//   Post.patch(
//     {
//       _id: req.params.id,
//       completeDate: req.params.completeDate,
//     },
//     function (err, post) {
//       console.log("Deleting Post " + req.params.id);
//       res.json(post);
//     }
//   );
// });

// router.patch("/patch/:id", (req, res) => {
//   Post.findByIdAndUpdate(req.post._id, req.body.completeDate)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

router.patch("/update/:id", function (req, res, next) {
  console.log(req.params.completeDate);
  console.log(req.params.done);

  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { completeDate: req.params.completeDate },
    { done: req.params.done },
    function (err, post) {
      console.log("Updating Post " + req.params.id);
      res.json(post);
    }
  );
});

// router.get("/", async function (req, res, next) {
//   const posts = await Post.find().where("author").equals(req.payload.id).exec();
//   //const posts = await Post.find().exec();
//   return res.status(200).json({ posts: posts });
// });

// router.get("/:id", async function (req, res, next) {
//   const post = await Post.findOne().where("_id").equals(req.params.id).exec();
//   //const posts = await Post.find().exec();
//   return res.status(200).json(post);
// });

module.exports = router;

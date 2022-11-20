const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  listItem: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createDate: { type: String, required: true },
  completeDate: { type: String },
  done: { type: Boolean },
});

//Export model
module.exports = mongoose.model("Post", PostSchema);

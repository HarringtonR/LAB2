var express = require("express");

var app = express();

require("./setupMongo")();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.delete("/delete/:id", require("./routes/delete"));
app.patch("/update/:id", require("./routes/update.js"));

module.exports = app;

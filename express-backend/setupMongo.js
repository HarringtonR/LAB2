const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGOOSE_APP_USERNAME_KEY}:${process.env.MONGOOSE_APP_PASSWORD_KEY}@cluster0.rbhjliz.mongodb.net/?retryWrites=true&w=majority`;

function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.rbhjliz.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

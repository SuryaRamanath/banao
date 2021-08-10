require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

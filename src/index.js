require("dotenv").config({ path: "./.env" });
const express = require("express");
require("./connect/mongoose");

//Routes
const RegisterRouter = require("./routes/register")
const LoginRouter = require("./routes/login")
const ForgotRouter = require("./routes/forgotPswd")

const app = express();
app.use(express.json());

app.use(RegisterRouter)
app.use(LoginRouter)
app.use(ForgotRouter)

const port = process.env.PORT || 6000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});
// import statements
// express -> handle API
const express = require("express");
// mongoose -> to communicate with mongodb
const mongoose = require("mongoose");
// dotenv.config() -> to access .env file variables
const dotenv = require("dotenv");

// models
const userModel = require("./models/user.model");
dotenv.config();

// instance for express or else we use express().get->its not an proper way so we create separate var and store it
const app = express();

// config json for communicate with json type data's from client to server
app.use(express.json());

// connection statement
mongoose.connect(process.env.MONGODB_URI);

// server
app.listen(8000, () => {
  console.log(`http://localhost:8000/`);
});

// initial Route
app.get("/", (req, res) => {
  return res.send("Home Route").status(200);
});

// /user to create user
// async await used to handle promises ( time taken to request and response )
app.post("/register", async (req, res) => {
  try {
    // destructure from req.body
    const { name, email, password } = req.body;
    const data = await userModel.create({
      name,
      email,
      password,
    });
    await data.save();
    return res
      .send({
        message: "User Details Added",
        data,
      })
      .status(201);
  } catch (error) {
    return res.send(error).status(501);
  }
});

app.post("/login", async (req, res) => {
  try {
    // get the email id and password from the user for login purpose
    const { email, password } = req.body;

    // findOne function helps to get correct user details by specifing this line { email, password } we pass email and password which we get from the user
    // findOne <-> select query in sql
    // comma works as and operator
    const userDetail = await userModel.findOne({ email, password });

    // suppose userDetails -> null there is no user
    if (!userDetail) {
      // once return statement aries the remaining block code will not execute so there is no need to specify else part rather we directly write the next statement
      return res.send({ message: "Invalid Credentials" }).status(404);
    }

    // if userDetails exist we send user details to the client by sending(userDetail) object
    return res.send({
      message: "Authenticate successful",
      userDetail,
    });
  } catch (error) {
    return res.send(error).status(501);
  }
});

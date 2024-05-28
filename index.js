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

// config json for communicate with json type datas from client to server
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
app.post("/user", async (req, res) => {
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

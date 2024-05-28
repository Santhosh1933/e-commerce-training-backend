const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(8000, () => {
  console.log(`http://localhost:8000/`);
});

app.get("/", (req, res) => {
  return res.send("Home Route").status(200);
});

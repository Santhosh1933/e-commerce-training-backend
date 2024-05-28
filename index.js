const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://santhoshs19032003:MCy1kP42D2V4MMPI@cluster0.movkrjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(8000, () => {
  console.log(`http://localhost:8000/`);
});

app.get("/", (req, res) => {
  return res.send("Home Route").status(200);
});

// import packages -> require
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// create server
app.listen(8000, () => {
  console.log("http:localhost:8000");
});

// initial route (Home Route)
app.get("/", (req, res) => {
  return res.send("Hello world").status(200);
});

const users = [
  {
    id: 1,
    name: "santhosh",
    age: 22,
    dep: "cse",
  },
  {
    id: 2,
    name: "Dhaneshvar",
    age: 20,
    dep: "it",
  },
  {
    id: 3,
    name: "Ayesha",
    age: 21,
    dep: "it",
  },
  {
    id: 4,
    name: "Threshika",
    age: 20,
    dep: "aiml",
  },
];

// req -> client -> server
//  res -> server -> client
//  {} => empty object
//  endpoint -> http://localhost:8000/user (Api)
//  route -> /user

const dummyData = {
  title: "This is a dummy data for testing purpose.",
  description: "sajssssss",
};

let { title: dummyDataTitle, description } = dummyData;

app.get("/user", (req, res) => {
  // query , params

  // works only in object ->  destructuring
  const { name } = req.query;

  let specificUser = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].name === name) {
      specificUser.push(users[index]);
    }
  }

  if (name) {
    if (specificUser.length !== 0) {
      return res.send(specificUser).status(200);
    } else {
      return res.send("User Not Found").status(404);
    }
  }

  // if name !=== undefined  return unreachable ( not execute)
  return res.send(users).status(200);
});

app.get("/user-by-name/:name", (req, res) => {
  const { name } = req.params;

  let specificUser = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].name === name) {
      specificUser.push(users[index]);
    }
  }
  if (name) {
    if (specificUser.length !== 0) {
      return res.send(specificUser).status(200);
    } else {
      return res.send("User Not Found").status(404);
    }
  }
  // if name !=== undefined  return unreachable ( not execute)
  return res.send(users).status(200);
});

app.post("/add-user", (req, res) => {
  const userDetail = req.body;
  users.push(userDetail);
  return res.send("User Added Successfully").status(200);
});

const userDatabase = [
  {
    username: "santhosh",
    password: "santhosh123",
  },
  {
    username: "Ayesha",
    password: "Ayesha123",
  },
];

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  // for loop start
  for (let index = 0; index < userDatabase.length; index++) {
    const element = userDatabase[index];
    if (element.username === username && element.password === password) {
      return res
        .send({
          message: "Login Successful",
        })
        .status(200);
    }
  }

  // loop end
  return res
    .send({
      message: "Login failed",
    })
    .status(404);
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  userDatabase.push({
    username,
    password,
  });

  return res.send({ message: "user added" }).status(200);
});

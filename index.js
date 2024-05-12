// import packages -> require
const express = require("express");

const app = express();

// create server
app.listen(8000, () => {
  console.log("http:localhost:8000");
});

// get -> send details from server-client eg:-login
// post -> eg:- registration ( client -> server -> db update (create))


// req->from user (client) 
// res-> to user ( server->client)

// 200 -> ok
// 404 -> not found
// 501 -> server error

// initial route (Home Route)
app.get("/", (req, res) => {
    return res.send("Hello world").status(200)
});
app.get("/user", (req, res) => {
    return res.send("santhosh").status(200)
});

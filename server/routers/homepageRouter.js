const express = require("express");
const jwt = require("jsonwebtoken");

// Entry Point: http://localhost:3000/homepage

const router = express.Router();

router.get("/", (req, res) => {

  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send("No token provided");
  }

  const ACCESS_SECRET_TOKEN = "someKey";

  jwt.verify(token, ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) {
      res.status(500).send("Failed to authenticate token");
    }
    const data = {user: user, token: token};

    res.send(data);
  });
});

module.exports = router;

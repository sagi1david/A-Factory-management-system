const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");
const actionsBLL = require("../BLL/actionsBLL");

// Entry point: http://localhost:3000/actions

const router = express.Router();

router.get("/", checkToken, checkAction, async (req, res) => {
  try {
    const actions = await actionsBLL.getAllActions();
    const data = { ...req.body.data, actions };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", checkToken, checkAction, async (req, res) => {
  try {
    const { id } = req.params;
    const action = await actionsBLL.getLastActionById(id);
    const data = { ...req.body.data, action };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  const ACCESS_SECRET_TOKEN = "someKey";

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, user) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    const data = { obj: { ...req.body }, token: token, user: user };
    req.body.data = data;

    next();
  });
}

async function checkAction(req, res, next) {
  const date = new Date().toLocaleDateString();

  const actionAllowd = req.headers["action-allowd"];

  if (actionAllowd !== undefined) {
    const users = await usersBLL.getAllUsers();
    const user = users.find(
      (user) => user.fullName === req.body.data.user.name
    );

    const data = await actionsBLL.getAllActions();

    data.actions.push({
      id: user._id,
      maxActions: user.numOfActions,
      date: date,
      actionAllowd: +actionAllowd,
    });

    actionsBLL.setActions(data);
  }

  next();
}

module.exports = router;

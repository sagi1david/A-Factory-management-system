const express = require("express");
const usersBLL = require("../BLL/usersBLL");
const actionsBLL = require("../BLL/actionsBLL");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Entry Point: http://localhost:3000/auth

router.post("/login", async (req, res) => {
  const date = new Date().toLocaleDateString();

  const user = { username: req.body.username, email: req.body.email };

  const userByUsernameAndEmail = await usersBLL.getUserByUsernameAndEmail(
    user.username,
    user.email
  );

  try {
    // if 'username' and 'email' are exist in DB:
    if (userByUsernameAndEmail !== undefined) {
      const ACCESS_SECRET_TOKEN = "someKey";

      const users = await usersBLL.getAllUsers();

      const user = users.find(
        (user) => user.fullName === userByUsernameAndEmail.name
      );

      const action = await actionsBLL.getLastActionById(user.id);

      if (action === undefined) {
        const accessToken = jwt.sign(
          userByUsernameAndEmail,
          ACCESS_SECRET_TOKEN
        );

        const data = await actionsBLL.getAllActions();

        data.actions.push({
          id: user._id,
          maxActions: user.numOfActions,
          date: date,
          actionAllowd: user.numOfActions,
        });

        actionsBLL.setActions(data);

        return res.send({
          accessToken: accessToken,
          actionAllowd: user.numOfActions,
        });
      } else {
        if (action.date !== date) {
          const accessToken = jwt.sign(
            userByUsernameAndEmail,
            ACCESS_SECRET_TOKEN
          );

          const data = await actionsBLL.getAllActions();

          data.actions = [];

          data.actions.push({
            id: user._id,
            maxActions: user.numOfActions,
            date: date,
            actionAllowd: user.numOfActions,
          });

          actionsBLL.setActions(data);

          return res.send({
            accessToken: accessToken,
            actionAllowd: user.numOfActions,
          });
        } else {
          if (action.actionAllowd > 1) {
            const accessToken = jwt.sign(
              userByUsernameAndEmail,
              ACCESS_SECRET_TOKEN
            );

            const data = await actionsBLL.getAllActions();

            data.actions.push({
              id: user._id,
              maxActions: user.numOfActions,
              date: date,
              actionAllowd: action.actionAllowd,
            });

            actionsBLL.setActions(data);

            return res.send({
              accessToken: accessToken,
              actionAllowd: action.actionAllowd,
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(401).send("Unauthorized"); // Unauthorized
  }
});

module.exports = router;

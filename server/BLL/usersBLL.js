const usersWS = require("../DAL/userWS");
const User = require("../models/userModel");

const getUserByUsernameAndEmail = async (username, email) => {
  let { data: users } = await usersWS.getAllUsers();
  const user = users.find(
    (user) => user.username === username && user.email === email
  );

  if (user === undefined) return undefined;
  else return user;
};

// Get All
const getAllUsers = () => {
  return User.find();
};

// Get By ID
const getUserById = (id) => {
  return User.findById(id);
};

module.exports = {
  getUserByUsernameAndEmail,
  getAllUsers,
  getUserById,
};

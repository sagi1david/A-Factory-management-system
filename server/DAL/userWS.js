const axios = require("axios");

const urlUsers = "https://jsonplaceholder.typicode.com/users";

const getAllUsers = () => {
  return axios.get(urlUsers);
};

const getUserById = (id) => {
  return axios.get(`${urlUsers}/${id}`);
};

module.exports = { getAllUsers, getUserById };

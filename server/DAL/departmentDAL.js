const Department = require("../models/departmentModel");

// Get All
const getAllDepartments = (filters) => {
  if (filters._id === "") filters = {};
  return Department.find(filters);
};

// Get By ID
const getDepartmentById = (id) => {
  return Department.findById(id);
};

// Post
const addDepartment = async (obj) => {
  const department = new Department(obj);
  await department.save();
  return "Created!";
};

// Put
const updateDepartment = async (id, obj) => {
  await Department.findByIdAndUpdate(id, obj);
  return "Updated!";
};

//Delete
const deleteDepartment = async (id) => {
  await Department.findByIdAndDelete(id);
  return "Deleted!";
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};

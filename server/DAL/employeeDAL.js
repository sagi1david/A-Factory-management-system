const Employee = require("../models/employeeModel");

// Get All
const getAllEmployees = () => {
  return Employee.find();
};

// Get By ID
const getEmployeeById = (id) => {
  return Employee.findById(id);
};

// Post
const addEmployee = async (obj) => {
  const employee = new Employee(obj);
  await employee.save();
  return "Created!";
};

// Put
const updateEmployee = async (id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return "Updated!";
};

// Deleted
const deleteEmployee = async (id) => {
  await Employee.findByIdAndDelete(id);
  return "Deleted!";
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

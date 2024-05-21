const Shift = require("../models/shiftModel");

// Get All
const getAllShifts = () => {
  return Shift.find();
};

// Get By ID
const getShiftById = (id) => {
  return Shift.findById(id);
};

// Post
const addShift = async (obj) => {
  const shift = new Shift(obj);
  await shift.save();
  return "Created!";
};

// Put
const updateShift = async (id, obj) => {
  await Shift.findByIdAndUpdate(id, obj);
  return "Updated!";
};

// Deleted
const deleteShift = async (id) => {
  await Shift.findByIdAndDelete(id);
  return "Deleted!";
};

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift
};

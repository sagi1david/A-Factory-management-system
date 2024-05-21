const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: String,
    shiftsID: [String]
  },
  { versionKey: false }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;

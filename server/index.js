const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const actionsRouter = require("./routers/actionsRouter");
const authRouter = require("./routers/authRouter");
const departmentRouter = require("./routers/departmentRouter");
const employeeRouter = require("./routers/employeeRouter");
const homepageRouter = require("./routers/homepageRouter");
const shiftRouter = require("./routers/shiftRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use("/actions", actionsRouter); //Files
app.use("/auth", authRouter);
app.use("/departments", departmentRouter);
app.use("/employees", employeeRouter);
app.use("/homepage", homepageRouter);
app.use("/shifts", shiftRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

// Import all routers
const internalRouter = require("./routes/internalRoutes");
const timesheetRouter = require("./routes/timesheetRoute");
const userRouter = require("./routes/userRoutes");

mongoose.connect("mongodb://localhost:27017/TimesheetCollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();

// This is the port your application will use
const port = 3000;

// Add middleware to be able to read and understand json files
app.use(express.json());
app.use(cors()); // CORS // Cross Origin Resource Sharing
app.use(
  session({
    secret: "random secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Tell express that it needs to use the routers we have initialised
app.use("/internal", internalRouter);
app.use("/api/timesheet", timesheetRouter);
app.use("/api/users", userRouter);

app.listen(port, () =>
  console.log(`Timesheet app is listening at http://localhost:${port}`)
);
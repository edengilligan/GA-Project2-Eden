const mongoose = require("mongoose");

// Define my schema, or basically what my fruit object should look like
const timesheetSchema = mongoose.Schema({
  name: String,
  time: String,
  notes: String,
  completed: Boolean,
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "visit",
  }, 
});
// Export model to be used by the fruits router
module.exports = mongoose.model("timesheet", timesheetSchema);

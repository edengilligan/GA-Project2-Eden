const mongoose = require("mongoose");

const visitIdSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("visit", visitIdSchema);
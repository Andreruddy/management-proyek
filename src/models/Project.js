const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Project name is required"] },
  descriptions: String,
  title: { type: String, required: [true, "Project title is required"] },
});

module.exports = mongoose.model("Project", projectSchema);

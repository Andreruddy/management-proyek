const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "Project ID is required"],
  },
  name: {
    type: String,
    required: [true, "Task name is required"],
    minlength: [1, "Task name must not be empty"],
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
    minlength: [1, "Task title must not be empty"],
  },
  description: String,
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
    validate: {
      validator: function (value) {
        return value > this.startTime;
      },
      message: "End time must be later than start time",
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

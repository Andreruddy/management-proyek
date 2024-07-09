const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create Task
router.post("/projects/:projectId/tasks", async (req, res) => {
  const { projectId } = req.params;
  const { name, title, description, startTime, endTime } = req.body;

  // Validasi
  if (!projectId || !name || !title || !startTime || !endTime) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return res
      .status(400)
      .json({ error: "End time must be later than start time" });
  }

  try {
    const task = new Task({
      projectId,
      name,
      title,
      description,
      startTime,
      endTime,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read Tasks
router.get("/projects/:projectId/tasks", async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId }).populate("projectId");
    res.json({ message: "Success", tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Task
router.patch("/tasks/:id", async (req, res) => {
  const { name, title, startTime, endTime } = req.body;

  // Validasi
  if (!name || !title) {
    return res
      .status(400)
      .json({ error: "Task name and title must not be empty" });
  }
  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    return res
      .status(400)
      .json({ error: "End time must be later than start time" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Task
router.delete("tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

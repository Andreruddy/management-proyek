const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create Project
router.post("/", async (req, res) => {
  const { name, description, title } = req.body;

  // Validasi
  if (!name || !description || !title) {
    return res.status(400).json({ error: "All fields is required" });
  }

  try {
    const project = new Project({ name, description, title });
    await project.save();
    res
      .status(201)
      .json({ message: "Project created successfully", data: project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: "Success", data: projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Project
router.patch("/:id", async (req, res) => {
  const projects = req.body;
  // Validasi
  if (!projects) {
    return res.status(400).json({ error: "All fields is required" });
  }
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project updated successfully", data: project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully", data: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Project = require("../models/Project");

// Create project (client only)
router.post("/", requireAuth, async (req, res) => {
  try {
    const body = req.body;
    const project = await Project.create({ ...body, client: req.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List projects with filters
router.get("/", async (req, res) => {
  const { category, minBudget, maxBudget, duration, skills, q } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (duration) filter.duration = duration;
  if (minBudget || maxBudget) {
    filter.$and = [];
    if (minBudget) filter.$and.push({ budgetMin: { $gte: Number(minBudget) } });
    if (maxBudget) filter.$and.push({ budgetMax: { $lte: Number(maxBudget) } });
  }
  if (skills) filter.tags = { $in: skills.split(",").map(s=>s.trim()) };
  try {
    const query = q ? Project.find(filter).find({ $text: { $search: q } }) : Project.find(filter);
    const items = await query.sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List my projects (client-owned)
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const items = await Project.find({ client: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("client", "name email");
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update project
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate({ _id: req.params.id, client: req.userId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, client: req.userId });
    if (!deleted) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;



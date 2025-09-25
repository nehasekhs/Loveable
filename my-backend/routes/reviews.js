const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Review = require("../models/Review");
const Project = require("../models/Project");

// Create a review
router.post("/", requireAuth, async (req, res) => {
  try {
    const { projectId, revieweeId, rating, title, comment, type } = req.body;
    
    // Verify project exists and user is involved
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    
    if (project.client.toString() !== req.userId && type === "client") {
      return res.status(403).json({ message: "Only project client can review freelancer" });
    }
    
    const review = await Review.create({
      project: projectId,
      reviewer: req.userId,
      reviewee: revieweeId,
      rating,
      title,
      comment,
      type,
    });
    
    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "You have already reviewed this project" });
    }
    res.status(400).json({ message: err.message });
  }
});

// Get reviews for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate("reviewer", "name avatarUrl")
      .populate("project", "title")
      .sort({ createdAt: -1 });
    
    const stats = await Review.aggregate([
      { $match: { reviewee: req.params.userId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating"
          }
        }
      }
    ]);
    
    res.json({ reviews, stats: stats[0] || { averageRating: 0, totalReviews: 0, ratingDistribution: [] } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get reviews by project
router.get("/project/:projectId", async (req, res) => {
  try {
    const reviews = await Review.find({ project: req.params.projectId })
      .populate("reviewer", "name avatarUrl")
      .populate("reviewee", "name avatarUrl")
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

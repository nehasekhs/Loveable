const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    reviewee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    type: { type: String, enum: ["freelancer", "client"], required: true, index: true },
  },
  { timestamps: true }
);

// Ensure one review per project per reviewer
reviewSchema.index({ project: 1, reviewer: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);

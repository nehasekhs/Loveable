const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    company: { type: String, required: true },
    description: { type: String },
    budgetMin: { type: Number, index: true },
    budgetMax: { type: Number, index: true },
    duration: { type: String, index: true },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

// Text index on textual fields only
projectSchema.index({ title: "text", description: "text", company: "text" });
// Separate index for tags array for efficient $in queries
projectSchema.index({ tags: 1 });

module.exports = mongoose.model("Project", projectSchema);



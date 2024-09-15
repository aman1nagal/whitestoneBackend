const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

taskSchema.index({ userId: 1, timestamp: -1 }); // Index for efficient querying

module.exports = mongoose.model("Task", taskSchema);

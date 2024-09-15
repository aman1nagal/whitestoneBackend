const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  getTaskById,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { validateTask } = require("../validators/taskValidator");

const router = express.Router();

// Protect all task routes (only accessible to authenticated users)
router.use(protect);

// Routes for task operations with validation middleware
router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.get("/:id", getTaskById);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

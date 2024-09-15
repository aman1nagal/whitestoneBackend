const Task = require("../models/task");

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const tasks = await Task.find({ userId }).sort({
      timestamp: -1,
    });
    // console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params; // Read the ID from query parameters
  console.log(id);
  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      timestamp: Date.now(),
      userId,
    });
    const task = await newTask.save();
    res.status(201).json(task);

    // Broadcast to all connected clients
    req.io.emit("task-created", task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Find the task by ID
    const task = await Task.findById(id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the user is authorized to update this task
    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    // Update task fields only if new values are provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    // Save the updated task in the database
    const updatedTask = await task.save();

    // Send the updated task as a response
    res.json({
      message: "Task updated",
      task: updatedTask,
    });

    // Emit the update event to notify all connected clients
    req.io.emit("task-updated", updatedTask);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne({ _id: id });
    res.json({ message: "Task deleted" });

    // Broadcast to all connected clients
    req.io.emit("task-deleted", id);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

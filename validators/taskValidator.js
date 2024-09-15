const { check, validationResult } = require("express-validator");

// Task validation middleware
exports.validateTask = [
  // Check if the title field is not empty
  check("title").notEmpty().withMessage("Title is required"),

  // Check if the description field is not empty
  check("description").notEmpty().withMessage("Description is required"),

  // Check if the status is one of the valid options
  check("status")
    .optional()
    .isIn(["Pending", "Completed"])
    .withMessage('Status must be either "Pending" or "Completed"'),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

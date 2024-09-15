/**
 * Centralized error handling middleware
 */
const handleErrors = (err, req, res, next) => {
  // Log the error for debugging (you might want to use a more sophisticated logging system)
  console.error(err);

  // Determine the status code (default to 500 for server errors)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send JSON response with error details
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      // Include stack trace only in development environment
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};

module.exports = {
  handleErrors,
};

const jwt = require("jsonwebtoken");

// Middleware to protect routes by checking for a valid JWT token
exports.protect = (req, res, next) => {
  // Retrieve token from Authorization header (formatted as: "Bearer <token>")
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token is provided, deny access
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied, no token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information (e.g., user ID) to the request object
    req.user = decoded;

    // Continue to the next middleware/controller
    next();
  } catch (err) {
    // If token is invalid or expired, deny access
    return res
      .status(401)
      .json({ message: "Authorization denied, invalid token" });
  }
};

exports.protect = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ status: "401", error: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ status: "403", error: "Token Not Valid" });
    next();
  });
};

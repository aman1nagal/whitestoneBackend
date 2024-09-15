// socket/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("task-created", (task) => {
      socket.broadcast.emit("task-created", task); // Broadcast to all other clients
    });

    socket.on("task-updated", (task) => {
      socket.broadcast.emit("task-updated", task);
    });

    socket.on("task-deleted", (taskId) => {
      socket.broadcast.emit("task-deleted", taskId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

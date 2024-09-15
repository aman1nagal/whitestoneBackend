const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('createTask', (task) => {
      io.emit('taskCreated', task);
    });

    socket.on('updateTask', (task) => {
      io.emit('taskUpdated', task);
    });

    socket.on('deleteTask', (taskId) => {
      io.emit('taskDeleted', taskId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

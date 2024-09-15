const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api', taskRoutes);
app.use('/api', authRoutes);

app.use(errorMiddleware);

module.exports = app;

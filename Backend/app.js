const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const connectToDb = require('./db/db');

connectToDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', userRoutes);

module.exports = app;

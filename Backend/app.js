const dotenv = require('dotenv');
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');

connectToDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;

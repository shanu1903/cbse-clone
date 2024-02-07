const express = require('express');

const studentRoutes  = require('./students/students.routes')

const api = express.Router();
api.use('/students' , studentRoutes)

module.exports = api
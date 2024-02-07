const express = require('express');

const StudentModel = require('./../../models/student.model')

const studentRoutes = express.Router()

studentRoutes.post('/' , async (req, res) => {
    const studentInfo = req.body;
    const studentModel = new StudentModel({...studentInfo})
    const response  = await studentModel.save()
    return res.status(201).json(response);
})

module.exports = studentRoutes;
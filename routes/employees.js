const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create a new employee
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const { name, email, mobile, designation, gender, courses, image } = req.body;
        const newEmployee = new Employee({ name, email, mobile, designation, gender, courses, image });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ error: err.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, courses, image } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, mobile, designation, gender, courses, image }, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ error: err.message });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

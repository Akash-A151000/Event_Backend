const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  updateComplete,
  getCompletedTasks,
  deleteTask,
} = require('../controllers/tasks');

const router = express.Router();

router.delete('/tasks/task/:id', verifyToken, deleteTask);
router.post('/tasks', verifyToken, addTask);
router.get('/tasks', verifyToken, getAllTasks);
router.get('/tasks/completed', verifyToken, getCompletedTasks);
router.get('/task/:id', verifyToken, getTask);
router.put('/task/:id', verifyToken, updateTask);
router.put('/task/complete/:id', verifyToken, updateComplete);

module.exports = router;

const User = require('../models/User');
const Task = require('../models/Task');

const addTask = async (req, res) => {
  try {
    const { title, description, end } = req.body;

    const newTask = new Task({
      title,
      description,
      end,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    return res
      .status(201)
      .json({ message: 'Task created successfully', task: savedTask });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, end, completed } = req.body;
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.end = end;
    task.completed = completed;
    const updatedTask = await task.save();
    res
      .status(200)
      .json({ message: 'Task Updated Successfully', task: updatedTask });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({ tasks: tasks });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    res.status(200).json({ task: task });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const updateComplete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    task.completed = !task.completed;
    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task: task });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const id = req.user.id;
    const getCompletedTasks = await Task.find({ user: id, completed: true });
    res.status(200).json({ completedTasks: getCompletedTasks });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.deleteOne({ _id: taskId });
    if (deletedTask.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  updateComplete,
  getCompletedTasks,
  deleteTask,
};

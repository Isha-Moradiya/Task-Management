const slugify = require("slugify");
const Task = require("../model/task-model");

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    if (!title && !description) {
      return res
        .status(404)
        .json({ message: "Title and Description is required" });
    }

    const existTask = await Task.findOne({ title });
    if (existTask) {
      return res.status(200).json({ message: "Task already exist" });
    }

    const task = await new Task({
      title,
      description,
      userId,
      slug: slugify(title),
    }).save();
    res.status(201).json({ message: "Task created successfully!", task });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await Task.find({ userId });
    if (!task || task.length === 0) {
      return res.status(404).json({ message: "No task found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const getTaskByID = async (req, res, next) => {
  try {
    const data = await Task.find({ slug: req.params.slug });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, slug: slugify(title) },
      { new: true }
    );
    res.status(200).json({ message: "Task updated successfully!", task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTask,
  getTaskByID,
  updateTask,
  deleteTask,
};

const { Schema, model, default: mongoose } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = new model("Task", taskSchema);
module.exports = Task;

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    parentTask: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

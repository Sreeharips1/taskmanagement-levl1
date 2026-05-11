import mongoose from "mongoose";
import { type } from "os";

//create schema
const taskschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  due_date: {
    type: Date,
  },
});

//create modal
const task = mongoose.model("task", taskschema);

//export

export default task;

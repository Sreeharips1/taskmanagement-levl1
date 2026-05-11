//brain of application
import task from "../models/taskModals.js";

//create a new task
const newtask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title not found" });
    }
    const newtask = await task.create({ title, description, due_date });

    res
      .status(201)
      .json({ message: "created successfully", success: true, task: newtask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "failed to create" });
  }
};

//get all task

const gettasks = async (req, res) => {
  try {
    const tasks = await task.find({});

    res.status(200).json({
      success: true,
      tasks,
      message: "fatched all tasks",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      tasks,
      message: "cannot fetch the tasks",
    });
  }
};

//edit task

const updatetask = async (req, res) => {
  try {
    const taskid = req.params.id;
    const updatedtask = await task.findByIdAndUpdate(
      taskid,
      {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
      },
      {
        new: true,
      },
    );

    if (!updatedtask) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//delete

const deletetask = async (req, res) => {
  try {
    const taskid = req.params.id;

    const filteredtasks = await task.findByIdAndDelete(taskid);

    if (!filteredtasks) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "sucess",
      task: filteredtasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { newtask, updatetask, gettasks, deletetask };

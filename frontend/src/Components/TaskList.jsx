import React, { useCallback } from "react";
import FolderImg from "../assets/folder-white.svg";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  showCreateTaskScreen,
  setActiveTask,
  showTaskViewscreen,
  deleteTask,
  Showedit,
}) => {
  const viewTask = useCallback(
    (task) => {
      showTaskViewscreen(task);
    },
    [showTaskViewscreen],
  );
  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading"> Task</p>
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={FolderImg} alt="" />
            Add New Task
          </button>
        </div>
        <div className="task-list-container">
          {tasks.map((task, index) => (
            <TaskCard
              key={`${task._id}-task-title`}
              task={task}
              onClick={() => viewTask(task)}
              deleteTask={deleteTask}
              Showedit={Showedit}
            />
            // If index 1 => key => "1-task-title"
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;

import React from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";

const TaskCard = ({ task, onClick, deleteTask, Showedit }) => {
  return (
    <div className="task-tile-container cursor-pointer" onClick={onClick}>
      <span className="task-text-wrapper">
        <img src={CheckedBlue} className="task-icon" />
      </span>
      <div className="task-text-wrapper">
        <p className="task-primary-text"> {task.title}</p>
        <p className="task-secondary-text">{task.description}</p>
      </div>
      <div className="action-items-container">
        <img src={AlarmClock} />
        <p> {moment(task.due_date).format("DD MMM YYYY")}</p>
      </div>
      <div
        className="edit-container cursor-pointer"
        onClick={(e) => e.stopPropagation(Showedit(task))}
        task={task}
      >
        <img src={Edit} />
      </div>
      <div
        className="delete-container cursor-pointer"
        onClick={(e) => e.stopPropagation(deleteTask(task._id))}
      >
        <img src={Delete} />
      </div>
    </div>
  );
};

export default TaskCard;

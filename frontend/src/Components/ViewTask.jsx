import React from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import Cross from "../assets/cross-icon.svg";

const ViewTask = ({ task, showTaskListScreen, deleteTask, Showedit }) => {
  return (
    <>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={CheckedBlue} className="task-icon" alt="" />
          </span>
          <h2 className="view-task-title"> {task.title}</h2>
        </div>
        <div className="close-modal-btn" onClick={showTaskListScreen}>
          <img src={Cross} alt="" />
        </div>
      </div>

      <div className="flex">
        {/* description */}
        <pre className="view-task-description">{task.description}</pre>

        {/* right section */}
        <div className="view-task-right-section">
          {/* Due date given so run this block else if not provided or null then
          dont run this block */}
          {task.due_date && (
            <div className="view-task-info-box">
              <p className="label-14"> Due Date</p>
              <div className="flex date-cointainer">
                <img src={AlarmClock} alt="" />
                <p className="date-text">
                  {moment(task.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          )}
          {/* Edit */}
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={() => Showedit(task)}
          >
            <img src={Edit} width={16} height={16} alt="" />
            <p className="label-12">Edit Task</p>
          </div>
          {/* Delete */}
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={() => deleteTask(task._id)}
          >
            <img src={Delete} width={16} height={16} alt="" />
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTask;

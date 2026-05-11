import React, { useEffect, useState, useCallback } from "react";
// import React, { useCallback, useState } from "react";
import InputField from "./UI/InputField";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calendar from "../assets/calendar.svg";
import editTask from "./apifolder/edittask";

import clsx from "clsx";

const EditTask = ({ task, showTaskListScreen, fetchAllTasks }) => {
  // state
  const [taskTitle, settaskTitle] = useState("");
  const [taskDescription, settaskDescription] = useState("");
  const [taskDueDate, settaskDue_date] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (task) {
      settaskTitle(task.title);
      settaskDescription(task.description);
      settaskDue_date(new Date(task.due_date));
    }
  }, [task]);

  // handle
  const handletitle = useCallback((event) => settaskTitle(event.target.value));
  const handledescription = useCallback((event) =>
    settaskDescription(event.target.value),
  );
  const handleDuedate = useCallback((date) => settaskDue_date(date));

  const validate = useCallback((values) => {
    const { taskTitle, taskDescription } = values;

    if (taskTitle && taskDescription) {
      return true;
    } else {
      alert("Please fill out title and description.");
      return false;
    }
  }, []);

  const handleresponse = useCallback(
    (responseData) => {
      if (responseData.success) {
        fetchAllTasks(); // refresh task list
        showTaskListScreen();
      }
    },
    [fetchAllTasks, showTaskListScreen],
  );

  // handleError
  const handleerror = useCallback((errorMessage) => {
    alert(errorMessage);
  }, []);

  const updatetask = useCallback(
    (values) => {
      editTask(task._id, handleresponse, handleerror, values, setloading);
    },
    [handleresponse, handleerror],
  );

  const handletask = useCallback(() => {
    const values = { taskTitle, taskDescription, taskDueDate };
    const isvalidate = validate(values);
    if (isvalidate) {
      updatetask(values);
    }
  }, [updatetask, taskDescription, taskDueDate, taskTitle, validate]);

  return (
    <div>
      <div className="content-section create-task-section">
        <div className="create-task-card">
          <img src={UserIcon} width={263} alt="" />
          <h1 className="craete-task-title-text">Edit Task</h1>
          <InputField
            name="new-task-title"
            value={taskTitle}
            label="Title"
            type="text"
            inputImg={TitleImg}
            placeholder="title"
            onChange={handletitle}
          />
          <InputField
            name="new-task-description"
            value={taskDescription}
            label="Description"
            type="textarea"
            inputImg={Memo}
            placeholder={taskDescription}
            className="input-margin"
            onChange={handledescription}
          />
          <InputField
            name="new-task-due-date"
            value={taskDueDate}
            label="Due date"
            type="date"
            inputImg={Calendar}
            placeholder={taskDueDate}
            className="input-margin"
            onChange={handleDuedate}
          />
          <div className="add-edit-task-btns">
            <button
              className={clsx(
                "btn",
                "add-task-btn",
                loading ? "disabled-add-task-btn" : "cursor-pointer",
              )}
              onClick={handletask}
              disabled={loading}
            >
              {loading ? "Editing task" : "Edit TASK"}
            </button>
            <button
              className="btn cancel-btn cursor-pointer"
              onClick={showTaskListScreen}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;

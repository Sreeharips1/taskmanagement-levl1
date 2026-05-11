import React, { useCallback, useState } from "react";
import InputField from "./UI/InputField";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calendar from "../assets/calendar.svg";
import createTask from "./apifolder/createtask";
import clsx from "clsx";
// import clex from "../assets/Calendar.svg";

//add new task
//store inputs in react
//validate them
//send them into backend api
//fetch updated data

const CreateTask = ({ showTaskListScreen, fetchAllTasks }) => {
  //storing

  const [taskTitle, settaskTitle] = useState("");
  const [taskDescription, settaskDescription] = useState("");
  const [taskDueDate, settaskDue_date] = useState();
  const [loading, setloading] = useState(false);

  const handletitle = useCallback((event) => settaskTitle(event.target.value));
  const handledescription = useCallback((event) =>
    settaskDescription(event.target.value),
  );
  const handleDuedate = useCallback((date) => settaskDue_date(date));

  //validate

  const validate = useCallback((values) => {
    const { taskTitle, taskDescription } = values;

    if (taskTitle && taskDescription) {
      return true;
    } else {
      alert("Please fill out title and description.");
      return false;
    }
  }, []);

  //handle api
  // Handle API Response
  const handleResponse = useCallback(
    (responseData) => {
      if (responseData.success) {
        fetchAllTasks(); // refresh task list
        showTaskListScreen();
      }
    },
    [fetchAllTasks, showTaskListScreen],
  );

  // handleError
  const handleError = useCallback((errorMessage) => {
    alert(errorMessage);
  }, []);

  // sending the data to backend API
  const createNewTask = useCallback(
    (values) => {
      createTask(values, handleResponse, handleError, setloading);
    },
    [handleError, handleResponse],
  );

  // submitting the task
  const handleTask = useCallback(() => {
    const values = { taskTitle, taskDescription, taskDueDate };

    const isValid = validate(values);

    if (isValid) {
      createNewTask(values);
    }
  }, [createNewTask, taskDescription, taskDueDate, taskTitle, validate]);

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} width={263} alt="" />
        <h1 className="craete-task-title-text">Create New Task</h1>
        <InputField
          name="new-task-title"
          value={taskTitle}
          label="Title"
          type="text"
          inputImg={TitleImg}
          placeholder="Title"
          onChange={handletitle}
        />
        <InputField
          name="new-task-description"
          value={taskDescription}
          label="Description"
          type="textarea"
          inputImg={Memo}
          placeholder="Description"
          className="input-margin"
          onChange={handledescription}
        />
        <InputField
          name="new-task-due-date"
          value={taskDueDate}
          label="Due date"
          type="date"
          inputImg={Calendar}
          placeholder="Due Date"
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
            onClick={handleTask}
            disabled={loading}
          >
            {loading ? "adding task" : "ADD TASK"}
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
  );
};

export default CreateTask;

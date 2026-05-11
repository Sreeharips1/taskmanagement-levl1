import React, { useCallback, useState, useEffect } from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";
import Loading from "./UI/Loading";
import fetchtasks from "./apifolder/fetchtask";
import deleteTask from "./apifolder/delete";

const TaskMain = () => {
  /* =========================
     SCREEN CONTROL STATE
  ========================== */
  const [currenttask, setcurrenttask] = useState("noTask");

  const shownoTask = useCallback(() => {
    setcurrenttask("noTask");
  }, []);

  const showCreateTask = useCallback(() => {
    setcurrenttask("creatTask");
  }, []);

  const showTasklist = useCallback(() => {
    setcurrenttask("Tasklist");
  }, []);

  const showEdit = useCallback((task) => {
    setactivetask(task);
    setcurrenttask("Edittask");
  }, []);

  const showTaskViewscreen = useCallback((task) => {
    setactivetask(task);
    setcurrenttask("viewtask");
  }, []);

  /* =========================
     DATA STATE
  ========================== */
  const [tasks, settasks] = useState([]);
  const [loading, setloading] = useState(false);
  const [activetask, setactivetask] = useState(null);

  /* =========================
     API RESPONSE HANDLING
  ========================== */
  const handleresponse = useCallback(
    (responseData) => {
      const extractedTasks = responseData?.tasks || [];
      settasks(extractedTasks);

      if (extractedTasks.length) {
        showTasklist();
      } else {
        shownoTask();
      }
    },
    [showTasklist, shownoTask],
  );

  const handleerror = useCallback((errorMsg) => {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  //delete
  const handleResponse = useCallback(
    (responseData) => {
      if (responseData.success) {
        fetchAllTasks(); // refresh task list
        showTasklist();
      }
    },
    [fetchAllTasks, showTasklist],
  );

  /* =========================
     FETCH ALL TASKS
  ========================== */
  const fetchAllTasks = useCallback(() => {
    fetchtasks(setloading, handleresponse, handleerror);
  }, [handleresponse, handleerror]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  /* =========================
     DELETE TASK
  ========================== */
  const deletetask = useCallback(
    (taskid) => {
      deleteTask(taskid, handleerror, handleResponse, setloading);
    },
    [handleerror, handleResponse],
  );

  /* =========================
     RENDER
  ========================== */
  return (
    <div id="container-div">
      {loading && <Loading />}

      {currenttask === "noTask" && (
        <NoTask showCreateTaskScreen={showCreateTask} />
      )}

      {currenttask === "creatTask" && (
        <CreateTask
          showTaskListScreen={showTasklist}
          fetchAllTasks={fetchAllTasks}
        />
      )}

      {currenttask === "Edittask" && (
        <EditTask
          task={activetask}
          showTaskListScreen={showTasklist}
          fetchAllTasks={fetchAllTasks}
        />
      )}

      {currenttask === "Tasklist" && (
        <TaskList
          tasks={tasks}
          showCreateTaskScreen={showCreateTask}
          setActiveTask={setactivetask}
          showTaskViewscreen={showTaskViewscreen}
          deleteTask={deletetask}
          Showedit={showEdit}
        />
      )}

      {currenttask === "viewtask" && (
        <ViewTask
          task={activetask}
          showTaskListScreen={showTasklist}
          deleteTask={deletetask}
          Showedit={showEdit}
        />
      )}
    </div>
  );
};

export default TaskMain;

// import React, { useCallback, useState, useEffect } from "react";
// import NoTask from "./NoTask";
// import CreateTask from "./CreateTask";
// import TaskList from "./TaskList";
// import ViewTask from "./ViewTask";
// import EditTask from "./EditTask";
// import Loading from "./UI/Loading";
// import fetchtasks from "./apifolder/fetchtask";
// import deleteTask from "./apifolder/delete";

// const TaskMain = () => {
//   // //which screen user should see
//   // //noTask Initial Screen

//   const [currenttask, setcurrenttask] = useState("noTask");

//   //SHOWNO TASK
//   const shownoTask = useCallback(() => setcurrenttask("noTask"), []);
//   //showcreateTask
//   const ShowcreateTask = useCallback(() => setcurrenttask("creatTask"), []);

//   //showtasklist

//   const showTasklist = useCallback(() => setcurrenttask("Tasklist"), []);

//   //showedit
//   const ShowEdit = useCallback((task) => {
//     (setcurrenttask("Edittask"), setactivetask(task));
//   }, []);

//   // const ShowEdit = useCallback(() => setcurrenttask("edittask"), []);
//   const showTaskViewscreen = useCallback((task) => {
//     setactivetask(task);
//     setcurrenttask("viewtask");
//   }, []);

//   const viewTask = useCallback(() => setcurrenttask("viewtask"), []);

//   //state variables

//   const [tasks, settasks] = useState([]);
//   //control loading
//   const [loading, setloading] = useState(false);
//   //selected task
//   const [activetask, setactivetask] = useState(null);

//   //handleresponse
//   // const handleresponse = useCallback(
//   //   (responseData) => {
//   //     const exstractedtasks = responseData?.tasks || [];
//   //     settasks(exstractedtasks);
//   //     if (exstractedtasks.length) {
//   //       showTaskListScreen();
//   //     } else {
//   //       showCreateTaskScreen();
//   //     }
//   //   },
//   //   [showTaskListScreen, showCreateTaskScreen],
//   // );

//   const handleresponse = useCallback(
//     (responseData) => {
//       const extractedTasks = responseData?.tasks || [];
//       settasks(extractedTasks);

//       if (extractedTasks.length) {
//         showTasklist();
//       } else {
//         shownoTask();
//       }
//     },
//     [showTasklist, shownoTask],
//   );

//   //handleerror

//   const handleerror = useCallback((errorMsg) => {
//     alert(errorMsg);
//     console.error(errorMsg);
//   }, []);

//   //fetch all tasks
//   const fetchAllTasks = useCallback(() => {
//     fetchtasks(setloading, handleresponse, handleerror);
//   }, [handleresponse, handleerror]);

//   useEffect(() => {
//     fetchAllTasks();
//   }, [fetchAllTasks]);

//   //delete
//   const deletetask = useCallback(
//     (taskid) => {
//       console.log("setloading:", setloading);

//       deleteTask(taskid, handleerror, handleresponse, setloading);
//       fetchAllTasks();
//       console.log("setloading:", handleresponse);
//     },
//     [handleerror, handleresponse, fetchAllTasks],
//   );

//   return (
//     <div id="container-div">
//       {loading && <Loading />}
//       {currenttask === "noTask" && (
//         <NoTask showCreateTaskScreen={ShowcreateTask} />
//       )}
//       {currenttask === "creatTask" && (
//         <CreateTask
//           showTaskListScreen={showTasklist}
//           fetchAllTasks={fetchAllTasks}
//         />
//       )}
//       {currenttask === "Edittask" && (
//         <EditTask task={activetask} showTaskListScreen={showTasklist} />
//       )}
//       {currenttask === "Tasklist" && (
//         <TaskList
//           tasks={tasks}
//           showCreateTaskScreen={ShowcreateTask}
//           setActiveTask={setactivetask}
//           showTaskViewscreen={showTaskViewscreen}
//           deleteTask={deletetask}
//           Showedit={Showedit}
//         />
//       )}
//       {currenttask === "viewtask" && (
//         <ViewTask
//           task={activetask}
//           showTaskListScreen={showTasklist}
//           deleteTask={deletetask}
//         />
//       )}
//     </div>
//   );
// };

// export default TaskMain;

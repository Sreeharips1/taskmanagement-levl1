async function editTask(
  taskid,
  handleresponse,
  handleerror,
  values,
  setloading,
) {
  setloading(true);

  try {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const endpoint = "/api/v1/tasks/" + taskid;
    const url = new URL(endpoint, baseurl);

    const reqbody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: reqbody,
    });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured";
      throw new Error(errorMessage);
    }
    handleresponse(jsonData);
  } catch (error) {
    handleerror(error);
  } finally {
    setloading(false);
  }
}

export default editTask;

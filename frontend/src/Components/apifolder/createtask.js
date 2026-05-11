//add the tasks

//turn on loading spinner

//make a post req to the backend api

//send task data injson format

//wait for the server to respond

//if success: call handle response with the data

//if error: call handler

//turnoff loading spinner

async function createTask(values, handleresponse, handleerror, setloading) {
  setloading(true);
  try {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const endpoint = "/api/v1/tasks";
    const url = new URL(endpoint, baseurl);

    const reqbody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });

    const response = await fetch(url, {
      method: "POST",
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

export default createTask;

async function deleteTask(taskid, handleerror, handleresponse, setloading) {
  //handleresponse,
  setloading(true);
  try {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const endpoint = "/api/v1/tasks/" + taskid;
    const url = new URL(endpoint, baseurl);

    const response = await fetch(url, {
      method: "DELETE",
    });

    const jsondata = await response.json();

    if (!response.ok) {
      const errorMessage = jsondata.message || "unknown error occured";
      throw new Error(errorMessage);
    }
    handleresponse(jsondata);
  } catch (error) {
    handleerror(error);
  } finally {
    setloading(false);
  }
}

export default deleteTask;

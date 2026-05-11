async function fetchtasks(setloading, handleresponse, handleerror) {
  setloading(true);
  try {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const endpoint = "api/v1/tasks";

    const url = new URL(endpoint, baseurl);

    //send GET REQ
    const response = await fetch(url);

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
export default fetchtasks;

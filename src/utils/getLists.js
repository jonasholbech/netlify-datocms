const getLists = async (dispatch) => {
  const response = await fetch("/api/get-all-lists");
  const data = await response.json();
  dispatch({
    type: "setLists",
    payload: data.lists,
  });
  dispatch({
    type: "loaded",
    payload: "",
  });
};
export default getLists;

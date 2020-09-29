import React, { createContext, useReducer } from "react";

const initialState = {
  loading: true,
  lists: [],
  username: localStorage.getItem("username"),
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer((state = initialState, action) => {
    if (action.type === "loaded") {
      return { ...state, loading: false };
    }
    if (action.type === "setUsername") {
      localStorage.setItem("username", action.payload);
      return { ...state, username: action.payload };
    }
    if (action.type === "setLists") {
      return { ...state, lists: action.payload };
    }
    if (action.type === "addComment") {
      const newLists = state.lists.map((list) => {
        //Deep clone
        let newList = JSON.parse(JSON.stringify(list));
        if (newList._id === action.payload.list._id) {
          newList.comments.data = newList.comments.data.concat(action.payload);
        }
        return newList;
      });
      return { ...state, lists: newLists };
    }
    if (action.type === "deleteComment") {
      const nextLists = state.lists.map((list) => {
        let newList = JSON.parse(JSON.stringify(list));
        newList.comments.data = newList.comments.data.filter(
          (com) => com._id !== action.payload._id
        );
        return newList;
      });
      return { ...state, lists: nextLists };
    }
    if (action.type === "addSubComment") {
      const nextLists = state.lists.map((list) => {
        const newList = JSON.parse(JSON.stringify(list));
        newList.comments.data = newList.comments.data.map((com) => {
          if (com._id === action.payload.scdata.parentId) {
            com.comments.data = com.comments.data.concat(action.payload.scdata);
          }
          return com;
        });
        return newList;
      });
      return { ...state, lists: nextLists };
    }
    if (action.type === "deleteSubComment") {
      const nextLists = [...state.lists];
      const whichList = nextLists.findIndex(
        (list) => list._id === action.payload.liID
      );
      const whichComment = nextLists[whichList].comments.data.findIndex(
        (com) => com._id === action.payload.coID
      );
      nextLists[whichList].comments.data[
        whichComment
      ].comments.data = nextLists[whichList].comments.data[
        whichComment
      ].comments.data.filter((com) => com._id !== action.payload.scID);
      return { ...state, lists: nextLists };
    }

    /*  default:
        throw new Error();*/
  }, initialState);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  loading: true,
  lists: [],
  username: localStorage.getItem("username"),
};
const store = createContext(initialState);
const { Provider } = store;
//TODO: lots of leftovers (for copy paste purposes)
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
          console.log("found it");
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
    if (action.type === "add") {
      const items = state.items.concat({
        id: Math.random(),
        header: action.payload,
        completed: false,
      });
      return { ...state, items: items };
    }
    if (action.type === "toggle") {
      const items = state.items.map((item) => {
        console.log(item);
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
      return { ...state, items: items };
    }

    if (action.type === "delete") {
      const items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, items: items };
    }
    if (action.type === "login") {
      return { ...state, loggedIn: true };
    }
    if (action.type === "logout") {
      return { ...state, loggedIn: false };
    }
    /*  default:
        throw new Error();*/
  }, initialState);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

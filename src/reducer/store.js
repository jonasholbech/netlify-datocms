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

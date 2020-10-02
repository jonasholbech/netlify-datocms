import React, { createContext, useReducer } from "react";

const initialState = {
  loading: true,
  lists: [],
  godMode: Boolean(JSON.parse(localStorage.getItem("godmode"))),
  username: localStorage.getItem("username"),
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer((state = initialState, action) => {
    if (action.type === "loaded") {
      return { ...state, loading: false };
    }
    if (action.type === "loading") {
      return { ...state, loading: true };
    }
    if (action.type === "toggleGodMode") {
      return { ...state, godMode: !state.godMode };
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
        if (newList.id === action.payload.list) {
          newList.comments = newList.comments.concat(action.payload);
        }
        return newList;
      });
      return { ...state, lists: newLists };
    }
    if (action.type === "deleteComment") {
      const nextLists = state.lists.map((list) => {
        let newList = JSON.parse(JSON.stringify(list));
        newList.comments = newList.comments.filter(
          (com) => com.id !== action.payload.id
        );
        return newList;
      });
      return { ...state, lists: nextLists };
    }
    if (action.type === "addSubComment") {
      const nextLists = state.lists.map((list) => {
        const newList = JSON.parse(JSON.stringify(list));
        newList.comments = newList.comments.map((com) => {
          if (com.id === action.payload.scdata.parentid) {
            com.comments = com.comments.concat(action.payload.scdata);
          }
          return com;
        });
        return newList;
      });
      return { ...state, lists: nextLists };
    }
    if (action.type === "deleteSubComment") {
      /*
      {
  "id": "7774588",
  "comment": "zsdfxgchgv",
  "author": "Jonas",
  "parentid": "7627421",
  "updatedAt": "2020-10-02T09:16:13.794+02:00",
  "createdAt": "2020-10-02T09:16:13.776+02:00",
  "meta": {
    "createdAt": "2020-10-02T09:16:13.776+02:00",
    "updatedAt": "2020-10-02T09:16:13.794+02:00",
    "publishedAt": "2020-10-02T09:16:13.791+02:00",
    "firstPublishedAt": "2020-10-02T09:16:13.791+02:00",
    "publicationScheduledAt": null,
    "status": "published",
    "isValid": true,
    "currentVersion": "14808952"
  },
  "itemType": "321427",
  "creator": {
    "id": "71323",
    "type": "access_token"
  }
}
      */
      const { scID, coID } = action.payload;

      const nextLists = state.lists.map((list) => {
        const newList = JSON.parse(JSON.stringify(list));
        newList.comments = newList.comments.map((comment) => {
          if (comment.id === coID) {
            comment.comments = comment.comments.filter(
              (subcomment) => subcomment.id !== scID
            );
          }
          return comment;
        });
        return newList;
      });
      return { ...state, lists: nextLists };
    }

    /*  default:
        throw new Error();*/
  }, initialState);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

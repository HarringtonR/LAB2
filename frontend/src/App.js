import React, { useState, useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import "./App.css";

import CreatePost from "./post/CreatePost";

import appReducer from "./reducers";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

import { StateContext } from "./contexts";

function App() {
  const initialToDo = [];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialToDo,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s To Do List`;
    } else {
      document.title = "ToDo";
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}
export default App;

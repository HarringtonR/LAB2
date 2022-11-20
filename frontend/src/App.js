import React, { useState, useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import "./App.css";

import CreatePost from "./post/CreatePost";

import appReducer from "./reducers";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

import { StateContext } from "./contexts";
import UserBar from "./user/UserBar";
import Logout from "./user/Logout";
import Login from "./user/Login";
import Register from "./user/Register";

const PostList = React.lazy(() => import("./post/PostList"));

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

  //   return (
  //     <div>
  //       <StateContext.Provider value={{ state, dispatch }}>
  //         <BrowserRouter>
  //           <Routes>
  //             <Route path="/" element={<Layout />}>
  //               <Route index element={<HomePage />} />
  //             </Route>
  //             <Route path="/post" element={<Layout />}>
  //               <Route path="/post/create" element={<CreatePost />} />
  //               <Route path="/post/:id" element={<PostPage />} />
  //             </Route>
  //           </Routes>
  //         </BrowserRouter>
  //       </StateContext.Provider>
  //     </div>
  //   );
  // }

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

  // const [posts, getPosts] = useResource(() => ({
  //   url: "/posts",
  //   method: "get",
  // }));

  // useEffect(getPosts, []);

  // useEffect(() => {
  //   if (posts && posts.data) {
  //     dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
  //   }
  // }, [posts]);

  // if (user) {
  // return (
  //   <div>
  //     <StateContext.Provider value={{ state, dispatch }}>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<Layout />}>
  //             <Route index element={<HomePage />} />
  //           </Route>
  //           <Route path="/post" element={<Layout />}>
  //             <Route path="/post/create" element={<CreatePost />} />
  //             <Route path="/post/:id" element={<PostPage />} />
  //           </Route>
  //         </Routes>
  //       </BrowserRouter>
  //     </StateContext.Provider>
  //   </div>
  // );
  // } else {
  //   return (
  //     <div>
  //       <div className="App-header">
  //         <h2>To-do List</h2>
  //       </div>
  //       <div>
  //         <div className="App-Login ">
  //           <StateContext.Provider value={{ state, dispatch }}>
  //             <UserBar />
  //           </StateContext.Provider>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
export default App;

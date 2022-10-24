import React, { useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";
import appReducer from "./reducers";

import UserBar from "./components/user/UserBar";
import PostList from "./components/post/PostList";
import CreatePost from "./components/post/CreatePost";

import "./App.css";

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

  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
    }
  }, [posts]);

  if (user) {
    return (
      <div>
        <StateContext.Provider value={{ state, dispatch }}>
          <div className="App">
            <div className="App-header">
              <h2>To-do List</h2>
            </div>
            <div>
              <div className="App-Login ">
                <UserBar />
              </div>
              <div className="App-Body">
                {state.user && <CreatePost />}
                <PostList />
              </div>
            </div>
          </div>
        </StateContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="App-Login ">
        <StateContext.Provider value={{ state, dispatch }}>
          <UserBar />
        </StateContext.Provider>
      </div>
    );
  }
}
export default App;

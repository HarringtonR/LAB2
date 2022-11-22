import React, { useContext } from "react";
import { StateContext } from "../contexts";
import CreatePost from "../post/CreatePost";

import Login from "./Login";

import Register from "./Register";
const Logout = React.lazy(() => import("./Logout"));

export default function UserBar() {
  const { state } = useContext(StateContext);
  console.log(state.user.username);
  if (state.user) {
    return (
      <div>
        <Logout />
        <CreatePost />
      </div>
    );
  } else {
    return (
      <div className="login">
        <Login />
        <Register />
      </div>
    );
  }
}

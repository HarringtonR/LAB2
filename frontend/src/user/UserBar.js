import React, { useContext } from "react";
import { StateContext } from "../contexts";
import { Outlet, Link } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

const Logout = React.lazy(() => import("./Logout"));

export default function UserBar() {
  const { user } = useContext(StateContext);

  if (user) {
    return <Logout />;
  } else {
    return (
      <div className="userBar">
        <div className="forms">
          <h4>Login: </h4> <Login />
        </div>
        <div className="forms">
          <h4>Register: </h4> <Register />
        </div>
      </div>
    );
  }
}

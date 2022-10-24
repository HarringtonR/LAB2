import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { useContext } from "react";

import { StateContext } from "../../contexts";

export default function UserBar({}) {
  const { state } = useContext(StateContext);

  if (state.user) {
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

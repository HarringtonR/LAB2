// import React, { useContext } from "react";
// import { StateContext } from "../contexts";

// import Login from "./Login";
// import Register from "./Register";

// const Logout = React.lazy(() => import("./Logout"));

// export default function UserBar() {
//   const { state } = useContext(StateContext);
//   console.log(state.user.username);
//   if (state.user) {
//     return <Logout />;
//   } else {
//     return (
//       <div className="userBar">
//         <div className="forms">
//           <h4>Login: </h4> <Login />
//         </div>
//         <div className="forms">
//           <h4>Register: </h4> <Register />
//         </div>
//       </div>
//     );
//   }
// }

import React, { useContext } from "react";
import { StateContext } from "../contexts";
import CreatePost from "../post/CreatePost";

import Login from "./Login";
//import Logout from "./Logout";

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


import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, dispatch }) {
  if (user) {
    return <Logout user={user} dispatch={dispatch} />;
  } else {
    return (
      <div className="userBar">
        <div className="forms">
        <h4>Login: </h4> <Login dispatch={dispatch} />
        </div>
        <div className="forms">
        <h4>Register: </h4> <Register dispatch={dispatch} />
        </div>
      </div>
    );
  }
}

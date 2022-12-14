import { useContext } from "react";
import { StateContext } from "../contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      className="logout"
      onSubmit={(e) => {
        this.user = null;
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <div>
        Logged in as: <b>{user.username}</b>
      </div>
      <input type="submit" value="Logout" />
    </form>
  );
}

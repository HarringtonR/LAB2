export default function Logout({ user, dispatch }) {
  return (
    <form className="logout"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <div>
       Logged in as: <b>{user}</b>
        </div>
      <input type="submit" value="Logout" />
    </form>
  );
}

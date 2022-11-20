import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import UserBar from "../user/UserBar";
import { StateContext } from "../contexts";

export default function Layout() {
  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <div>
      <div className="App-header">
        <h2>To-do List</h2>
      </div>
      <div className="App-Login ">
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>{" "}
      </div>
      <br />
    </div>
  );
}

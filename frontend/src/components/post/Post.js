import React from "react";
import { useContext, useState } from "react";
import { StateContext } from "../../contexts";
import { useResource } from "react-request-hook";

function Post({ number, listItem, description, author, done, createDate, id }) {
  const today = new Date();
  const dt = today.toDateString();

  const { state, dispatch } = useContext(StateContext);

  const [switchText, setSwtichText] = useState(done);

  const [posts, deletePost] = useResource(({ id }) => ({
    url: "/posts/" + id,
    method: "DELETE",
    data: { id: id },
  }));

  return (
    <div className="renderPost">
      <div className="renderPostText">
        <h1>{number}</h1>
        <p>{switchText ? dt : createDate} </p>
        <h3>{listItem}</h3>
        <div>{description}</div>
        <br />
        <i>
          Written by <b>{author}</b>
        </i>
        <div>
          <button
            className="delete"
            onClick={(e) => {
              e.preventDefault();
              deletePost({ id: id });
              dispatch({
                type: "DELETE_POST",
                id: id,
              });
            }}
          >
            Remove
          </button>

          {/* <button className="delete" onClick={(e) => {handleremove(e)}}>Remove</button> */}
        </div>
      </div>
      <div>
        {switchText ? "Completed" : "Incomplete"}
        <input
          className="checkBox"
          type="checkbox"
          onClick={() => setSwtichText(!switchText)}
        />
      </div>
    </div>
  );
}

export default React.memo(Post);

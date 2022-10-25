import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../../contexts";
import { useResource } from "react-request-hook";

function Post({
  number,
  listItem,
  description,
  author,
  done,
  createDate,
  completeDate,
  id,
}) {
  const today = new Date();
  const dt = today.toDateString();

  const { dispatch } = useContext(StateContext);

  const [switchText, setSwtichText] = useState(done);
  const [dateText, setDateText] = useState(completeDate);

  const [, deletePost] = useResource(({ id }) => ({
    url: "/posts/" + id,
    method: "DELETE",
    data: { id: id },
  }));

  const [, updatePost] = useResource(({ id, dt }) => ({
    url: "/posts/" + id,
    method: "patch",
    data: { completeDate: dt, done: !switchText },
  }));

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

  return (
    <div className="renderPost">
      <div className="renderPostText">
        <h1>{number}</h1>
        <p>{switchText ? dateText : createDate} </p>
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
          onChange={(e) => setSwtichText(e.currentTarget.checked)}
          onClick={(e) => {
            e.preventDefault();
            completeDate = dt;
            setDateText(dt);
            updatePost({ id: id, dt, switchText });
            dispatch({
              type: "UPDATE_POST",
              id: id,
              completeDate: completeDate,
            });
            setSwtichText(switchText);
          }}
          checked={switchText}
        />
      </div>
    </div>
  );
}

export default React.memo(Post);

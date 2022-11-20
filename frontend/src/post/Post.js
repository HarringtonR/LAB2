import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";

function Post({
  listItem,
  description,
  author,
  done,
  createDate,
  completeDate,
  _id,
}) {
  const today = new Date();
  const dt = today.toDateString();

  const { state, dispatch } = useContext(StateContext);

  const [switchText, setSwtichText] = useState(done);
  const [dateText, setDateText] = useState(completeDate);

  const [, deletePost] = useResource(({ id }) => ({
    url: `/delete/${id}`,
    method: "DELETE",
    headers: { Authorization: `${state.user.access_token}` },
    data: { id: id },
  }));

  const [, updatePost] = useResource(({ id, dt }) => ({
    url: `/update/${id}`,
    method: "PATCH",
    headers: { Authorization: `${state.user.access_token}` },
    data: { completeDate: dt, done: !switchText },
  }));

  // const [posts, getPosts] = useResource(() => ({
  //   url: `/posts/${_id}`,
  //   method: "GET",
  // }));

  // useEffect(() => {
  //   if (posts && posts.data) {
  //     dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
  //   }
  // }, [posts]);

  return (
    <div className="renderPost">
      <div className="renderPostText">
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
              deletePost({ id: _id });
              dispatch({
                type: "DELETE_POST",
                id: _id,
              });
            }}
          >
            Remove
          </button>
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
            updatePost({ id: _id, dt, switchText });
            dispatch({
              type: "UPDATE_POST",
              id: _id,
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

// import React from "react";
// import { Link } from "react-router-dom";

// import { useContext } from "react";

// function Post({ listItem, description, author, _id }) {
//   console.log("Post rendered");
//   return (
//     <div>
//       <Link to={`/post/${_id}`}>
//         <h3 style={{ color: "black" }}>{listItem}</h3>
//       </Link>

//       <div>{description}</div>
//       <br />
//       <i>
//         Written by <b>{author}</b>
//       </i>
//     </div>
//   );
// }

// export default React.memo(Post);
// //export default Post;

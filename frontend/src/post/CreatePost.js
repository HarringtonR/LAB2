// import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";

import { StateContext } from "../contexts";

export default function CreatePost() {
  const today = new Date();
  const dt = today.toDateString();

  // const maxPost = Math.max(...posts.map((num) => num.number));

  // const [number] = useState("maxPost");
  const [listItem, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [createDate] = useState(dt);
  const [completeDate] = useState("");
  const [done, setDone] = useState(false);
  // const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createPost] = useResource(
    ({ listItem, description, author, createDate, completeDate, done }) => ({
      url: "/post",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { listItem, description, createDate, completeDate, done },
    })
  );

  useEffect(() => {
    if (post.isLoading === false && post.data) {
      dispatch({
        type: "CREATE_POST",
        id: post.data.id,
        listItem: post.data.listItem,
        description: post.data.description,
        author: user.username,
        createDate: createDate,
        completeDate: completeDate,
        done: done,
      });
    }
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost({
          listItem,
          description,
          author: user,
          createDate,
          completeDate,
          done,
        });
      }}
    >
      {/* className="newPost"
      onSubmit={(e) => {
        e.preventDefault();
        createPost({
          listItem,
          description,
          author: user,
          createDate,
          completeDate,
          done,
        });
        dispatch({
          type: "CREATE_POST",
          // number,
          listItem,
          description,
          author: user,
          createDate,
          completeDate,
          done,
          id: uuidv4(),
        });
      }}
    > */}
      <div className="newPost">
        <div>
          <div>{/* Item Number: {number} */}</div>
          <div>
            Author: <b>{user.username}</b>
          </div>
          <div>
            <input
              placeholder="To-do Item"
              type="text"
              name="create-title"
              id="create-title"
              value={listItem}
              onChange={(e) => setItem(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <textarea
            placeholder="Description...."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
        </div>
        <input
          className="submitButton"
          type="submit"
          value="Add Item To List"
        />
      </div>
    </form>
  );
}

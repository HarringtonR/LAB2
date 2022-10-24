import { v4 as uuidv4 } from "uuid";
import { useState, useContext } from "react";
import { useResource } from "react-request-hook";

import { StateContext } from "../../contexts";

export default function CreatePost() {
  const today = new Date();
  const dt = today.toDateString();

  // const maxPost = Math.max(...posts.map((num) => num.number));

  // const [number] = useState("maxPost");
  const [listItem, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [createDate] = useState(dt);
  const [completeDate] = useState("");
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [posts, createPost] = useResource(
    ({ listItem, description, author }) => ({
      url: "/posts",
      method: "post",
      data: { listItem, description, author },
    })
  );

  return (
    <form
      className="newPost"
      onSubmit={(e) => {
        e.preventDefault();
        createPost({ listItem, description, author: user });
        dispatch({
          type: "CREATE_POST",
          // number,
          listItem,
          description,
          author: user,
          createDate,
          completeDate,
          id: uuidv4(),
        });
      }}
    >
      <div className="newPost">
        <div>
          <div>{/* Item Number: {number} */}</div>
          <div>
            Author: <b>{user}</b>
          </div>
          <div>
            <input
              placeholder="To-do Item"
              type="text"
              name="create-title"
              id="create-title"
              value={listItem}
              onChange={(event) => setItem(event.target.value)}
              required
            />
          </div>
          <textarea
            placeholder="Description...."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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

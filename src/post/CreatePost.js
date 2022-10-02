import { useState } from "react";

export default function CreatePost({ user, posts, dispatch }) {
  const today = new Date();
  const dt = today.toDateString();

  const maxPost =  Math.max(...posts.map(num => num.number))

  const [number] = useState(maxPost);
  const [listItem, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [done] = useState(false);
  const [createDate] = useState(dt);
  const [completeDate] = useState("");

 

  return (
    <form className="newPost"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "CREATE_POST", number, listItem, description, author: user, done: false,  createDate, completeDate });
      
      }}
    >
      <div className="newPost">
      <div>

        <div>
          Item Number: {number}
        </div>
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
          />
        </div>
        <textarea
          placeholder="Description...."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
          
        </div>
        <input className="submitButton" type="submit" value="Add Item To List" />
      </div>
    </form>

  );
}

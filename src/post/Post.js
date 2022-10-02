import React, { useState } from "react";


export default function Post({number, listItem, description, author, done, createDate }) {

  const today = new Date();
  const dt = today.toDateString();

  const [switchText, setSwtichText] = useState(done);
  
  return (
    <div className = "renderPost">
      <div className="renderPostText">
      <h1>{number}</h1>
     <p>{switchText ? dt : createDate} </p> 
      <h3>{listItem}</h3>
      <div>{description}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      
      </div>
      <div>
      {switchText ? "Completed" : "Incomplete"}
      <input className = "checkBox" type="checkbox"  onClick={() => setSwtichText(!switchText)} />

      </div>
    </div>
  );
}

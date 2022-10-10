import appReducer from "./reducers";
import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import './App.css';
import Main from "./Main";

function App() {

    const initialList = [
        {
          // number: 1,
          listItem: "Mow",
          description: "Grass is too long and need to mow by friday",
          author: "Ross",
          done: null,
          createDate: "Sat Aug 01 2022",
          completeDate: null,
          id: uuidv4()
        },
        {
          // number: 2,
          listItem: "Go to Hardware Store",
          description: "Get Blades, and Grass Seed",
          author: "Ross",
          done: null,
          createDate: "Mon Jul 17 2022",
          completeDate: null,
          id: uuidv4()
        },
      ];

      

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialList,
    isLoggedIn: ""
    
  });



  return (
    <div className="App">
       <div className="App-header">
        <h2>To-do List</h2>
      </div>
    <Main user={state.user} posts={state.posts} dispatch={dispatch}  />
    </div>
      )
  }
export default App;

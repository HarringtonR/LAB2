function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        // number: action.number,
        listItem: action.listItem,
        description: action.description,
        author: action.author,
        done: action.done,
        createDate: action.createDate,
        completeDate: action.completeDate,
        id: action._id,
      };
      return [newPost, ...state];
    case "DELETE_POST":
      return [...state].filter((i) => i._id !== action._id);
    case "UPDATE_POST":
      return [...state];
    case "FETCH_POSTS":
      return action.posts;
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: todoReducer(state.posts, action),
  };
}

// function userReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//     case "REGISTER":
//       return {
//         username: action.username,
//         access_token: action.access_token,
//       };
//     case "LOGOUT":
//       return null;

//     default:
//       return state;
//   }
// }

// function postReducer(state, action) {
//   switch (action.type) {
//     case "CREATE_POST":
//       const newPost = {
//         title: action.title,
//         content: action.content,
//         author: action.author,
//         id: action.id,
//       };
//       return [newPost, ...state];
//     case "FETCH_POSTS":
//       return action.posts;
//     case "CLEAR_POSTS":
//       return [];

//     default:
//       return state;
//   }
// }

// export default function appReducer(state, action) {
//   return {
//     user: userReducer(state.user, action),
//     posts: postReducer(state.posts, action),
//   };
// }

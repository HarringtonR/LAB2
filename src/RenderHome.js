import UserBar from "./user/UserBar";
import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";




export default function RenderHome({ user, posts, dispatch }){


    if(user){
      return(
        <div>
          <div className="App-Login ">
          <UserBar user={user} dispatch={dispatch} />
          </div>
            <body className="App-Body">
            {user && (
                <CreatePost user={user} posts={posts} dispatch={dispatch} />
            )}
              <PostList posts={posts} />
         
          </body>
        </div>  
        )
    }else{
      return(
        <div className="App-Login ">
      <UserBar user={user} dispatch={dispatch} />
    </div>
    )}
  }
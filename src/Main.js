import UserBar from "./components/user/UserBar";
import PostList from "./components/post/PostList";
import CreatePost from "./components/post/CreatePost";




export default function Main({ user, posts, dispatch }){


    if(user){
      return(
        <div>
          <div className="App-Login ">
          <UserBar user={user} dispatch={dispatch} />
          </div>
            <div className="App-Body">
            {user && (
                <CreatePost user={user} posts={posts} dispatch={dispatch} />
            )}
              <PostList posts={posts} dispatch={dispatch}/>
         
          </div>
        </div>  
        )
    }else{
      return(
        <div className="App-Login ">
      <UserBar user={user} dispatch={dispatch} />
    </div>
    )}
  }
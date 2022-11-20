import React, { useEffect, useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import PostList from "../post/PostList";
import UserBar from "../user/UserBar";
export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);

  const [posts, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.posts.reverse() });
    }
  }, [posts]);

  if (state.user.username) {
    return (
      <>
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>{" "}
        <br />
        <div>
          {posts?.isLoading && "Posts loading..."} <PostList />
        </div>
      </>
    );
  } else {
    return (
      <>
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>{" "}
        <br />
      </>
    );
  }
}

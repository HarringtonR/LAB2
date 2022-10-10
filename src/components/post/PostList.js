import Post from "./Post";

export default function PostList({ posts = [] , dispatch}) {

  return (
    <div>
      {posts.map((p, i) => (
        <Post {...p} key={p.id} dispatch={dispatch} />
      ))}
    </div>
  );
}

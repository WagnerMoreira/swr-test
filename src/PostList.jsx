import React from "react";

import usePosts from "./Hooks/usePosts";

function CreateForm() {
  const { create } = usePosts();
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    create(title, author);
  };

  return (
    <form className="p-4 w-80 border-4 bg-lime-200 flex flex-col border-slate-500 border-dashed">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      /> */}
      <button onClick={handleSubmit}>Create</button>
    </form>
  );
}

const PostCard = ({ post, favorite }) => (
  <div className="m-4 border-2 p-2 w-40 flex" key={post.id}>
    {console.log("rerender")}
    <div>{post.isFavorite ? "🌟" : "🌠"}</div>
    <input
      type="checkbox"
      checked={post.isFavorite}
      onChange={() => favorite(post)}
    />
    <h2>{post.title}</h2>
    <h3>{post.author}</h3>
  </div>
);

export default function PostList() {
  const { data, error, isLoading, favorite } = usePosts();
  console.log(data);
  if (error) return <div>ERROR 💥💥💥</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <CreateForm />

      <div className="mt-4 flex">
        {data &&
          data.map((post) => (
            <PostCard key={post.id} post={post} favorite={favorite} />
          ))}
      </div>
    </div>
  );
}

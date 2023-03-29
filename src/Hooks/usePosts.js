import useSWR from "swr";
import { fetcher } from "../api/utils";

export default function usePosts() {
  const { data, error, isLoading, mutate } = useSWR("/posts", () =>
    fetcher("/posts")
  );

  async function create(title, author) {
    await fetcher("/posts", {
      method: "POST",
      body: JSON.stringify({ title, author }),
    });
    mutate();
  }

  async function update(id, title) {
    await fetcher(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title }),
    });
    mutate();
  }

  async function favorite(post) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    await fetcher(`/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...post, isFavorite: !post.isFavorite }),
      headers: headersList,
    });
    const updatedPost = { ...post, isFavorite: !post.isFavorite };
    const newData = data.map((item) => {
      if (item.id === post.id) {
        return updatedPost;
      }
      return item;
    });
    mutate(newData, { revalidate: false, populateCache: true });
  }

  async function destroy(id) {
    await fetcher(`/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
  }

  return {
    data,
    create,
    update,
    destroy,
    favorite,
    error,
    isLoading,
  };
}

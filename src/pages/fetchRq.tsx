import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../api/api";
import { NavLink } from "react-router";
import { useState } from "react";

export const FetchRq = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    // gcTime: 5 * 1000 * 60,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(Number(id)),
    onSuccess: (data: any, id: number) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem: any) =>
        curElem?.filter((post: { id: number }) => post.id !== id)
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(Number(id), "I have updated"),
    onSuccess: (appData: any, postID: number) => {
      queryClient.setQueryData(["posts", pageNumber], (posts: any) =>
        posts.map((post: any) =>
          post.id === postID ? { ...post, title: appData.data.title } : post
        )
      );
    },
  });

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;
  console.log(">>>>isPending");

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem: { id: any; title: any; body: any }) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/fetchrq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/api";
import { NavLink } from "react-router";

export const FetchRq = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(Number(id)),
    onSuccess: (data: any, id: number) => {
      queryClient.setQueryData(["posts"], (curElem: any) =>
        curElem?.filter((post: { id: number }) => post.id !== id)
      );
    },
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

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
    </div>
  );
};

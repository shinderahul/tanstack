import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { fetchIndPost } from "../api/api";

export const FetchInd = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchIndPost(Number(id)),
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="section-accordion bg">
      <h1>Post ID Number - {data?.id}</h1>
      <div>
        <p>ID: {data?.id}</p>
        <p>Title: {data?.title}</p>
        <p>Body: {data?.body}</p>
      </div>
      <NavLink to="/fetchrq">
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};

import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

export const FetchRq = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log(">>>>data", isLoading, data);
  if (isLoading) return <p>Loading....</p>;
  return <h1>Hello Fetch React Query</h1>;
};

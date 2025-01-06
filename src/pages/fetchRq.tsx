import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

export const FetchRq = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log(">>>>data", isLoading, data);
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem: { id: any; title: any; body: any }) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{id}</p>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

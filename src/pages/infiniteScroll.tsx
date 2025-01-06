import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const InfiniteScroll = () => {
  const { data, isFetchingNextPage, fetchNextPage, status, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 0,
      getNextPageParam: (lastPage: any, allPages: any) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div className="white">Loading...</div>;
  if (status === "error")
    return <div className="white">Error fetching data</div>;

  return (
    <>
      <h1>Infinite Scroll with React Query v5</h1>
      {data?.pages?.map((page: any, index: number) => (
        <ul key={index} className="user">
          {page?.map((user: any) => (
            <li key={user.id}>
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}

      <div ref={ref} className="white">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </div>
    </>
  );
};

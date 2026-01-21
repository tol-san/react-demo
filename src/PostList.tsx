import React from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  
  const pageSize = 10;
  const {data, error, isLoading, fetchNextPage, isFetching} = usePosts({pageSize});

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
  return (
    <div className="container mt-5">
      <ul className=" list-group">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li className="list-group-item" key={post.id}>
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        disabled={isFetching}
        onClick={() => fetchNextPage()}
        className="btn btn-primary mt-3 me-1"
      >
        {isFetching ? 'Loading' : 'Load More'}
      </button>

    </div>
  );
}

export default PostList
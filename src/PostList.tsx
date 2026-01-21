import {  useState } from "react";
import usePosts from "./hooks/usePosts"

const PostList = () => {
  
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const {data: posts, error, isLoading} = usePosts({page, pageSize});

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
  return (
    <div className="container mt-5">
     
      <ul className=" list-group">
        {posts?.map((post) => (
          <li className="list-group-item" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
      <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="btn btn-primary mt-3 me-1"
      >Previous</button>
      <button
      disabled={page === 10}
      onClick={() => setPage(page + 1)}
      className="btn btn-primary mt-3"
      >Next</button>
    </div>
  );
}

export default PostList
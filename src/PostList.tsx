import {  useState } from "react";
import usePosts from "./hooks/usePosts"

const PostList = () => {

  const [userId, setUserId] = useState<number>(); 
  const {data: posts, error, isLoading} = usePosts(userId);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
  return (
    <div className="container mt-5">
      <select
        onChange={(e) => {
          const value = e.target.value
          setUserId(value === '' ? undefined : Number(value))
        }}
        value={userId}
        className=" form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className=" list-group">
        {posts?.map((post) => (
          <li className="list-group-item" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList
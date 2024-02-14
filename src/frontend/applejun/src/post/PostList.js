import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchGetPostList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/post/get/list");
        setPostList(response.data.contents);
      } catch (error) {
        console.error("Error from get post list : ", error);
      }
    };

    fetchGetPostList();
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            <p>ID: {post.id}</p>
            <p>Title: {post.title}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

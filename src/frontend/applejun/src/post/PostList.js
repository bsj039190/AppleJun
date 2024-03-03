import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchGetPostList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/post/get/list",
          { withCredentials: true }
        );
        setPostList(response.data.contents);
      } catch (error) {
        console.error("Error from get post list : ", error);
      }
    };

    fetchGetPostList();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
      </div>
      <h2>포스트 목록</h2>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            {/* Link를 사용하여 포스트 세부 정보 페이지로 이동하는 링크를 만듭니다. */}
            <p>ID: {post.id}</p>
            <Link to={`/post/get/${post.id}`}>
              <p>제목: {post.title}</p>
              {/* 필요에 따라 더 많은 세부 정보를 추가할 수 있습니다. */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

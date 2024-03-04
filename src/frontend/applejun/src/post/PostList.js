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
        console.log(response.data.contents);
      } catch (error) {
        console.error("Error from get post list : ", error);
      }
    };

    fetchGetPostList();
  }, []);

  const extractFileNameAddPath = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
      </div>
      <h2>포스트 목록</h2>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            <p>ID: {post.id}</p>
            <Link to={`/post/get/${post.id}`}>
              <p>제목: {post.title}</p>
              {post.images.map((img, index) => (
                <img
                  src={`/post-image/${extractFileNameAddPath(img)}`}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "20%" }}
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={() => console.error("Error loading image")}
                />
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

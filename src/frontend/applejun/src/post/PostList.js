// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// const PostList = () => {
//   const [postList, setPostList] = useState([]);
//   const history = useHistory();

//   useEffect(() => {
//     const fetchGetPostList = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/post/get/list",
//           { withCredentials: true }
//         );
//         setPostList(response.data.contents);
//         console.log(response.data.contents);
//       } catch (error) {
//         console.error("Error from get post list : ", error);
//       }
//     };

//     fetchGetPostList();
//   }, []);

//   const extractFileNameAddPath = (filePath) => {
//     // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
//     const parts = filePath.split(/[\\/]/);

//     // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
//     return parts.pop();
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={() => history.push(`/home`)}>홈으로</button>
//       </div>
//       <h2>포스트 목록</h2>
//       <ul>
//         {postList.map((post) => (
//           <li key={post.id}>
//             <p>ID: {post.id}</p>
//             <Link to={`/post/get/${post.id}`}>
//               <p>제목: {post.title}</p>
//               {post.images.map((img, index) => (
//                 <img
//                   src={`/post-image/${extractFileNameAddPath(img)}`}
//                   alt={`Image ${index + 1}`}
//                   style={{ maxWidth: "20%" }}
//                   onLoad={() => console.log("Image loaded successfully")}
//                   onError={() => console.error("Error loading image")}
//                 />
//               ))}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <button>더보기</button>
//     </div>
//   );
// };

// export default PostList;

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0); // 페이지 번호
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const history = useHistory();

  const extractFileNameAddPath = (filePath) => {
    const parts = filePath.split(/[\\/]/);
    return parts.pop();
  };

  const fetchMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/post/get/list?page=${page}`,
        { withCredentials: true }
      );

      if (response.data.contents.length === 0) {
        setHasMore(false); // 불러올 데이터가 없다면 hasMore를 false로 설정
        alert("더 이상의 포스트가 없습니다.");
        return;
      }

      setPostList((prevPosts) => [...prevPosts, ...response.data.contents]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, []); // 최초 렌더링 시 1회 호출

  const handleMoreButtonClick = () => {
    fetchMorePosts();
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
                  key={index}
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

      {hasMore && (
        <button onClick={handleMoreButtonClick} disabled={loading}>
          {loading ? "로딩 중..." : "더보기"}
        </button>
      )}
    </div>
  );
};

export default PostList;

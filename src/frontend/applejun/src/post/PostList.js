/* import React, { useEffect, useState } from "react";
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

      <button>더보기</button>
    </div>
  );
};

export default PostList; */

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/app/UpperbarProfile.css";
import "../css/app/PostList.css";
import "../css/app/Background.css";

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0); // 페이지 번호
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const history = useHistory();

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

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

      console.log(response.data.contents);

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

  const fetchProfile = async (e) => {
    const joon = await axios.get(`http://localhost:8080/account/get/1`, {
      withCredentials: true,
    });

    const joonData = joon.data.contents;
    if (joonData !== null) {
      setLeft({
        name: joonData.name,
        profileImage: extractFileNameAddPath(joonData.profileImage),
      });
    }

    const soo = await axios.get(`http://localhost:8080/account/get/2`, {
      withCredentials: true,
    });

    const sooData = soo.data.contents;
    if (sooData !== null) {
      setRight({
        name: sooData.name,
        profileImage: extractFileNameAddPath(sooData.profileImage),
      });
    }
  };

  const handleMoreButtonClick = () => {
    fetchMorePosts();
  };

  useEffect(() => {
    fetchMorePosts();
    fetchProfile();
  }, []); // 최초 렌더링 시 1회 호출

  return (
    <div>
      <div
        id="n_1920__10"
        className="gradient-background"
        style={{ zIndex: -2 }}
      >
        <svg className="n_27_t">
          <linearGradient
            id="n_27_t"
            spreadMethod="pad"
            x1="0"
            x2="1"
            y1="0.5"
            y2="0.5"
          >
            <stop offset="0" stopColor="#ffe0e7" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#d6eaff" stopOpacity="1"></stop>
          </linearGradient>
          <rect
            id="n_27_t"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </div>

      <div className="upperbarLeftSubject">
        <img
          src="/logos/StoryList.png"
          style={{ width: "40px", height: "auto" }}
        />
        <p
          className="customTextColorAndShadow"
          style={{ display: "flex", marginLeft: "10px" }}
        >
          스토리 목록
        </p>
      </div>

      <div className="upperbarProfileGruop customTextColorAndShadow">
        <p>{left.name}</p>
        <img
          src={`/profile-image/${left.profileImage}`}
          alt="leftProfile"
          className="upperbarProfileGruopImg"
        />

        <img
          src="/logos/Heart.png"
          alt="Heart"
          style={{ width: "50px", height: "50px" }}
        />

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>

      <div className="postListHomeButton">
        <img
          src="/logos/HomeButton.png"
          onClick={() => history.push(`/home`)}
          style={{ width: "36px", height: "36px" }}
        />
      </div>

      <div className="whiteCircle">
        <div className="textContainer">
          <p
            style={{
              fontSize: "16px",
              marginBottom: "-30px",
              marginTop: "-20px",
              lineHeight: "0",
            }}
          >
            TODAY
          </p>
          <p style={{ fontSize: "80px", lineHeight: "0px" }}>200</p>
        </div>
      </div>

      <div className="postGroup">
        {postList.map((post) => (
          <div key={post.id} className="postDivide">
            <p className="postDate">
              {post.date[0]}.{post.date[1]}.{post.date[2]}
            </p>
            <Link to={`/post/get/${post.id}`} className="postLink">
              <p className="postTitle">{post.title}</p>
              <p className="postContents">{post.content}</p>
              <div className="postImageContainer">
                {console.log(post.id)}
                {console.log(post.images)}
                {(() => {
                  const images = [];
                  for (let i = 0; i < 3; i++) {
                    const imgSrc = post.images[i]
                      ? `/post-image/${extractFileNameAddPath(post.images[i])}`
                      : "/logos/PostNoneBox.png";
                    images.push(
                      <img
                        key={i}
                        src={imgSrc}
                        alt={`Image ${i + 1}`}
                        className="postImage"
                        onLoad={() => console.log("Image loaded successfully")}
                        onError={() => console.error("Error loading image")}
                      />
                    );
                  }
                  return images;
                })()}
              </div>
            </Link>
          </div>
        ))}
        {hasMore && (
          <button
            onClick={handleMoreButtonClick}
            disabled={loading}
            className="postMoreButton"
          >
            {loading ? "로딩 중..." : "더 보 기"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostList;

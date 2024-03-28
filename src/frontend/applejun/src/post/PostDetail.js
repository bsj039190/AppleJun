import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../css/app/Background.css";
import "../css/app/UpperbarProfile.css";
import "../css/app/PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [gpsList, setGpsList] = useState();

  const history = useHistory();

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        // 삭제 요청을 보냅니다.
        await axios.delete(`http://localhost:8080/post/delete/${id}`, {
          withCredentials: true,
        });
        // 삭제가 완료되면 리스트 페이지로 이동합니다.
        alert("삭제가 완료되었습니다.");
        history.replace("/post/get/list");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  //사진정보에서 이름부분만 추출
  const extractFileNameAddPath = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  const fetchProfile = async (e) => {
    const joon = await axios.get(`http://localhost:8080/account/get/1`, {
      withCredentials: true,
    });

    const joonData = joon.data.contents;
    if (joonData !== null) {
      console.log(joonData);
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
      console.log(sooData);
      setRight({
        name: sooData.name,
        profileImage: extractFileNameAddPath(sooData.profileImage),
      });
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      const response = await axios.get(`http://localhost:8080/post/${id}`, {
        withCredentials: true,
      });
      setPost(response.data.contents);
      console.log(response.data.contents);

      console.log(post.gps1);
    };
    fetchPostDetail();
    fetchProfile();
  }, [id]);

  useEffect(() => {
    const getGps = async () => {
      const gpsResponse = await axios.get(
        `http://localhost:8080/gps/get/list`,
        {
          withCredentials: true,
        }
      );

      // post.gps1, post.gps2, post.gps3 값과 일치하는 항목만 필터링
      const filteredGpsList = gpsResponse.data.contents.filter((gpsItem) => {
        return (
          gpsItem.id === post.gps1 ||
          gpsItem.id === post.gps2 ||
          gpsItem.id === post.gps3
        );
      });

      setGpsList(filteredGpsList);
      console.log(filteredGpsList);
    };
    getGps();
  }, [post]);

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

      {/* <div className="postListHomeButton">
        <img
          src="/logos/HomeButton.png"
          onClick={() => history.push(`/home`)}
          style={{ width: "36px", height: "36px" }}
        />
      </div> */}

      <div className="postBigContainer">
        <div className="postSmallContainer">
          <div className="postDetailDate">
            <p
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              {post.date?.[0]
                ? `${post.date[0]}. ${post.date[1]}. ${post.date[2]}`
                : "0"}
            </p>
          </div>

          <p style={{ fontSize: "30px" }}>
            <a
              href="/post/get/list"
              style={{
                fontWeight: "bold",
                color: "black",
                textDecoration: "none",
              }}
            >
              &lt;
            </a>
            {post.title}
          </p>

          {/* <div className="postDetailImageWrapper">
            {post.images && post.images.length > 0 ? (
              post.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`/post-image/${extractFileNameAddPath(image)}`}
                    alt={`Image ${index + 1}`}
                    style={{ flexDirection: "row" }}
                    onLoad={() => console.log("Image loaded successfully")}
                    onError={() => console.error("Error loading image")}
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div> */}

          <div className="postDetailImageWrapper">
            {(() => {
              //Trouble Shooting 처음 렌더링 할때 null인 상태가 되어서 오류가 터져서 if문으로 오류가 터지지 않도록 방지함
              if (post.images == null) {
                return "No images available";
              } else {
                const imageList = [];
                for (let i = 0; i < 3; i++) {
                  const imgSrc = post.images[i]
                    ? `/post-image/${extractFileNameAddPath(post.images[i])}`
                    : "/logos/PostNoneBox.png";

                  imageList.push(
                    <img
                      src={imgSrc}
                      onLoad={() => console.log("Image loaded successfully")}
                      onError={() => console.error("Error loading image")}
                    />
                  );
                }
                return imageList;
              }
            })()}
          </div>

          <div className="postDetailGpsContainer">
            {gpsList && gpsList.length > 0 ? (
              // 모든 항목의 id가 1인 경우에만 "No GPS data available"을 출력
              gpsList.every((gpsItem) => gpsItem.id === 1) ? (
                <p>No GPS data available</p>
              ) : (
                <p>
                  {gpsList.map(
                    (gpsItem) =>
                      // id가 1인 경우는 출력하지 않음
                      gpsItem.id !== 1 && (
                        <li key={gpsItem.id}>
                          <img
                            src="/logos/Map.png"
                            className="postDetailGpsContainerImg"
                          />
                          <a href={gpsItem.url} target="_blank">
                            {gpsItem.name}
                          </a>
                        </li>
                      )
                  )}
                </p>
              )
            ) : (
              <p>No GPS data available</p>
            )}
          </div>
          <p>{post.content}</p>

          <button
            onClick={() => history.push(`/post/update/${id}`)}
            className="postDetailButton"
            style={{ marginLeft: "0px" }}
          >
            수정하기
          </button>

          <button onClick={handleDelete} className="postDetailButton">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

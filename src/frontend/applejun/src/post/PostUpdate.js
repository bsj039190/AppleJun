import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/app/UpperbarProfile.css";
import "../css/app/Background.css";
import "../css/app/PostWrite.css";

const PostUpdate = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [fileList, setFileList] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    uploader: 1,
    date: "2024-03-12",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });

  const [gpsList, setGpsList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const history = useHistory();

  const extractFileNameAddPath = (filePath) => {
    const parts = filePath.split(/[\\/]/);
    return parts.pop();
  };

  const handleInputChange = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);

    // 이미지 미리보기 생성
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDateChange = (date) => {
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      date: date ? date.toISOString().split("T")[0] : null,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append("fileList", fileList[i]);
      }
    } else {
      formData.append("fileList", new Blob()); // fileList가 비어 있을 때 빈 Blob을 append
    }

    formData.append(
      "postRequest",
      new Blob([JSON.stringify(updatedPost)], { type: "application/json" })
    );

    console.log([...formData]);

    try {
      await axios.put(`http://localhost:8080/post/update/${id}`, formData, {
        withCredentials: true,
      });

      // 업데이트 성공 후 리다이렉션
      alert("업데이트가 완료되었습니다!");
      history.push(`/post/get/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const getGps = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gps/get/list", {
        withCredentials: true,
      });
      setGpsList(response.data.contents);
      console.log(response.data.contents);
    } catch (error) {
      console.error("Error fetching GPS list:", error);
    }
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

  const loadStoredUser = async () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setCurrentUser(userObject.id);
      setUpdatedPost({ uploader: userObject.id });
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:8080/post/${id}`,
          {
            withCredentials: true,
          }
        );
        setPost(postResponse.data.contents);
        console.log(postResponse.data.contents);

        // 포스트 정보가 있으면, 해당 정보를 사용하여 updatedPost 초기값 설정
        if (postResponse.data.contents) {
          const { title, uploader, date, content, gps1, gps2, gps3 } =
            postResponse.data.contents;

          // date 배열을 가공하여 ISO 문자열로 변환
          const isoDateString = new Date(
            date[0],
            date[1] - 1,
            date[2]
          ).toISOString();

          setUpdatedPost({
            title,
            uploader,
            date: isoDateString,
            content,
            gps1,
            gps2,
            gps3,
          });
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };
    fetchPostDetail();
    getGps();
    fetchProfile();
    loadStoredUser();
  }, [id]);

  useEffect(() => {
    // 기존 이미지가 존재하면 이미지 미리보기 생성
    if (post.images && post.images.length > 0) {
      const previews = post.images.map(
        (image) => `/post-image/${extractFileNameAddPath(image)}`
      );
      setImagePreviews(previews);
      console.log(previews);
    }
  }, [post.images]);

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
          src="/logos/StoryWrite.png"
          style={{ width: "40px", height: "auto" }}
        />
        <p
          className="customTextColorAndShadow"
          style={{ display: "flex", marginLeft: "10px" }}
        >
          스토리 수정
        </p>
      </div>

      <div className="upperbarProfileGruop customTextColorAndShadow">
        <p>{left.name}</p>
        <img
          src={`/profile-image/${left.profileImage}`}
          alt="leftProfile"
          className="upperbarProfileGruopImg"
        />

        <a href="/home">
          <img
            src="/logos/Heart.png"
            alt="Heart"
            style={{ width: "50px", height: "50px" }}
          />
        </a>

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>
      <div className="postWriteBigWrapper">
        <p
          style={{
            fontSize: "30px",
            marginLeft: "50px",
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: "360px",
          }}
        >
          <a
            href={`/post/get/${post.id}`}
            style={{
              fontWeight: "bold",
              color: "black",
              textDecoration: "none",
            }}
          >
            &lt;
          </a>
          글 수정하기
        </p>

        <div className="postWriteBoder">
          <form
            onSubmit={handleUpdate}
            style={{ width: "800px", height: "70vh" }}
          >
            <label className="postWriteTitle">
              {/* Title: */}
              <input
                type="text"
                name="title"
                value={updatedPost.title}
                onChange={handleInputChange}
              />
            </label>
            <br />

            <label className="postWriteContent">
              {/* Content: */}
              <textarea
                name="content"
                value={updatedPost.content}
                onChange={handleInputChange}
              />
            </label>
            <br />

            {/* <label>
          Uploader:
          <input
            type="text"
            name="uploader"
            value={updatedPost.uploader}
            onChange={handleInputChange}
          />
        </label>
        <br /> */}

            <div className="postWriteGpsContainer">
              <label style={{ display: "flex", alignItems: "center" }}>
                <img src="/logos/Mapblue.png" className="postWriteGpsLogo" />
                <select
                  name="gps1"
                  value={updatedPost.gps1}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px" }}
                >
                  {gpsList.map((gps) => (
                    <option key={gps.id} value={gps.id}>
                      {gps.name}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <img src="/logos/Mapblue.png" className="postWriteGpsLogo" />
                <select
                  name="gps2"
                  value={updatedPost.gps2}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px" }}
                >
                  {gpsList.map((gps) => (
                    <option key={gps.id} value={gps.id}>
                      {gps.name}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <img src="/logos/Mapblue.png" className="postWriteGpsLogo" />
                <select
                  name="gps3"
                  value={updatedPost.gps3}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px" }}
                >
                  {gpsList.map((gps) => (
                    <option key={gps.id} value={gps.id}>
                      {gps.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="postWriteFileDateButtonContainer">
              <div className="postWriteFileDateContainer">
                <label
                  className="postWriteCustomFile"
                  style={{ marginRight: "20px" }}
                >
                  사진 업로드
                  <input
                    type="file"
                    name="fileList"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                <label>작성자: {updatedPost.uploader}</label>

                <label style={{ marginRight: "200px" }}>
                  날짜:
                  <DatePicker
                    selected={updatedPost.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </label>
              </div>
              <div className="postWriteSummitButton">
                <button onClick={() => handleUpdate}>업데이트</button>
              </div>
            </div>

            <div className="postWriteImagePreview">
              {/* 이미지 미리보기 */}
              {imagePreviews.length === 1 ? (
                <>
                  <img src={imagePreviews[0]} alt={`Preview 1`} />
                  <div>
                    <img src="/logos/PostNoneBox.png" alt={`Empty Preview 1`} />
                    <img src="/logos/PostNoneBox.png" alt={`Empty Preview 2`} />
                  </div>
                </>
              ) : imagePreviews.length === 2 ? (
                <>
                  <img src={imagePreviews[0]} alt={`Preview 1`} />
                  <img src={imagePreviews[1]} alt={`Preview 2`} />
                  <img src="/logos/PostNoneBox.png" alt={`Empty Preview 3`} />
                </>
              ) : imagePreviews.length === 3 ? (
                imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                ))
              ) : (
                <div>
                  <img src="/logos/PostNoneBox.png" alt={`Empty Preview 1`} />
                  <img src="/logos/PostNoneBox.png" alt={`Empty Preview 2`} />
                  <img src="/logos/PostNoneBox.png" alt={`Empty Preview 3`} />
                </div>
              )}
            </div>

            {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;

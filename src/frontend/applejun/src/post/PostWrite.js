import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import "../css/app/UpperbarProfile.css";
import "../css/app/Background.css";
import "../css/app/PostWrite.css";

const PostWrite = () => {
  const [postRequest, setPostRequest] = useState({
    title: "",
    uploader: 1,
    date: "2024-03-12",
    content: "",
    gps1: 1,
    gps2: 1,
    gps3: 1,
  });
  const [fileList, setFileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [gpsList, setGpsList] = useState([]);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(0);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostRequest({
      ...postRequest,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileList(files);

    // 이미지 미리보기 생성
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log(previews);
    setImagePreviews(previews);
  };

  const handleDateChange = (date) => {
    setPostRequest({
      ...postRequest,
      date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser != 3) {
      const formData = new FormData();

      console.log(postRequest);

      if (fileList.length > 3) {
        alert("사진은 최대 3장까지만 가능합니다.");
        return;
      }

      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          formData.append("fileList", fileList[i]);
        }
      } else {
        formData.append("fileList", new Blob()); // fileList가 비어 있을 때 빈 Blob을 append
      }

      formData.append(
        "postRequest",
        new Blob([JSON.stringify(postRequest)], { type: "application/json" })
      );

      console.log([...formData]);
      try {
        const response = await axios.post(
          "http://localhost:8080/post/create",
          formData,
          { withCredentials: true }
        );

        console.log(response.data);
        alert("작성을 완료하였습니다!");
        history.push("/post/get/list");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      alert("게스트 계정은 업로드 할 수 없습니다.");
      history.push("/post/get/list");
    }
  };

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setCurrentUser(userObject.id);
        setPostRequest({ uploader: userObject.id });
      }
    };

    loadStoredUser();
    getGps();
    fetchProfile();
  }, []);

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
          스토리 작성
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

      {/* <div className="postListHomeButton">
        <img
          src="/logos/HomeButton.png"
          onClick={() => history.push(`/home`)}
          style={{ width: "36px", height: "36px" }}
        />
      </div> */}

      <div className="postWriteBigWrapper">
        <p
          style={{
            fontSize: "30px",
            marginLeft: "50px",
          }}
        >
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
          글 작성하기
        </p>

        <div className="postWriteBoder">
          <form
            onSubmit={handleSubmit}
            style={{ width: "800px", height: "70vh" }}
          >
            <label className="postWriteTitle">
              {/* Title: */}
              <input
                type="text"
                name="title"
                value={postRequest.title}
                onChange={handleChange}
                placeholder="제목을 적어주세요."
              />
            </label>
            <br />

            <label className="postWriteContent">
              {/* Content: */}
              <input
                type="text"
                name="content"
                value={postRequest.content}
                onChange={handleChange}
                placeholder="내용을 적어주세요."
              />
            </label>
            <br />

            {/* <label>
              Uploader:
              <input
                type="text"
                name="uploader"
                value={currentUser}
                onChange={handleChange}
              />
            </label> */}

            {/* <label>
              Date:
              <input
                type="text"
                name="date"
                value={postRequest.date}
                onChange={handleChange}
              />
            </label>
            <br /> */}

            <div className="postWriteGpsContainer">
              <label style={{ display: "flex", alignItems: "center" }}>
                <img src="/logos/Mapblue.png" className="postWriteGpsLogo" />
                <select
                  name="gps1"
                  value={postRequest.gps1}
                  onChange={handleChange}
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
                  value={postRequest.gps2}
                  onChange={handleChange}
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
                  value={postRequest.gps3}
                  onChange={handleChange}
                >
                  {gpsList.map((gps) => (
                    <option key={gps.id} value={gps.id}>
                      {gps.name}
                      {/*아니 기본이 계속 호안끼엠으로 되어있음 더미가 아니라*/}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="postWriteSummitButton">
              <div className="postWriteFileDateContainer">
                <label
                  className="postWriteCustomFile"
                  style={{ marginRight: "20px" }}
                >
                  <button
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    사진 업로드
                    <input
                      type="file"
                      name="fileList"
                      multiple
                      onChange={handleFileChange}
                    />
                  </button>
                </label>

                <label>작성자: {postRequest.uploader}</label>

                <label>
                  날짜:
                  <DatePicker
                    selected={postRequest.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </label>
              </div>
              <button type="submit">저장하기</button>
            </div>

            {/* <div className="postWriteImagePreview">
              

              {imagePreviews.length > 0 ? (
                imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                ))
              ) : (
                <div>
                  <img src="/logos/PostNoneBox.png" />
                  <img src="/logos/PostNoneBox.png" />
                  <img src="/logos/PostNoneBox.png" />
                </div>
              )}
            </div> */}

            <div className="postWriteImagePreview">
              {/* 이미지 미리보기 */}

              <p>엄준식</p>
              {(() => {
                const images = [];
                if (imagePreviews == null) {
                  for (let i = 0; i < 3; i++) {
                    if (imagePreviews[i] !== null) {
                      console.log(imagePreviews[i]);
                      images.push(
                        <img
                          key={i}
                          src={imagePreviews[i]}
                          alt={`Preview ${i + 1}`}
                        />
                      );
                    } else {
                      images.push(
                        <img
                          key={i}
                          src="/logos/PostNoneBox.png"
                          alt={`Empty Preview ${i + 1}`}
                        />
                      );
                    }
                  }
                } else {
                  console.log("왜?");
                  for (let i = 0; i < 3; i++) {
                    images.push(
                      <img
                        key={i}
                        src="/logos/PostNoneBox.png"
                        alt={`Empty Preview ${i + 1}`}
                      />
                    );
                  }
                }
                return images;
              })()}
            </div>

            {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;

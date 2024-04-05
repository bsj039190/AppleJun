import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import BackgroundDelete from "./BackgroundDelete";
import BackgroundUpload from "./BackgroundUpload";
import "../css/Background.css";
import "../css/UpperbarProfile.css";
import "../css/BackgroundList.css";
import "../css/Modal.css";

Modal.setAppElement("#root");

function BackgroundList() {
  const [imageList, setImageList] = useState([]);
  const history = useHistory();
  //const [id, setId] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState();
  const [backgroundRequest, setBackgroundRequest] = useState({
    fileName: "",
    filePath: "src/frontend/applejun/public/background-image/",
    uploader: 1,
  });

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const [currentUser, setCurrentUser] = useState(0);

  const extractFileNameAddPath = (filePath) => {
    const parts = filePath.split(/[\\/]/);
    return parts.pop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser != 3) {
      let isUploaded = BackgroundUpload(uploadFile, backgroundRequest);
      console.log(isUploaded);
      if (isUploaded == 1) {
        window.location.reload();
      } else {
        console.log(isUploaded);
      }
    } else {
      alert("게스트 계정은 업로드 할 수 없습니다.");
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBackgroundRequest({
      ...backgroundRequest,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    setUploadFile(file);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteBackgroundImage = (imageId) => {
    const isDeleted = BackgroundDelete(imageId);
    if (isDeleted == 1) {
      window.location.reload();
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

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setCurrentUser(userObject.id);
      }
    };

    loadStoredUser();
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchGetImageList = async (id) => {
      if (id !== 0) {
        // currentUser가 0이 아닌 경우에만 실행
        try {
          if (id == 3) {
            const response = await axios.get(
              `http://localhost:8080/background/list/1`,
              { withCredentials: true }
            );
            setImageList(response.data.contents);
            alert("게스트 계정은 관리자의 배경화면으로 보입니다.");
          } else {
            const response = await axios.get(
              `http://localhost:8080/background/list/${id}`,
              { withCredentials: true }
            );
            setImageList(response.data.contents);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchGetImageList(currentUser);
  }, [currentUser]);

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
          src="/logos/Background.png"
          style={{ width: "50px", height: "auto" }}
        />
        <p
          className="customTextColorAndShadow"
          style={{ display: "flex", marginLeft: "10px" }}
        >
          배경화면
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
            className="upperbarHeartLogo"
          />
        </a>

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>

      <div className="backListWhiteBoard">
        <div className="backListSubject">
          <h2>배경화면 목록</h2>
          <button onClick={() => setModalIsOpen(true)}>사진 추가하기</button>
        </div>

        <div className="backListImageWrapper">
          <div className="backListImageContainer">
            {imageList && imageList.length > 0 ? (
              imageList.map((image, index) => (
                <div>
                  <img
                    src={`/background-image/${extractFileNameAddPath(
                      image.filePath
                    )}`}
                    alt={`Image ${index}`}
                    onLoad={() => console.log("Image loaded successfully")}
                    onError={() => console.error("Error loading image")}
                  />
                  <button onClick={() => deleteBackgroundImage(image.id)}>
                    삭&nbsp;&nbsp;&nbsp;제
                  </button>
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="backgroundUpdateModal"
        contentLabel="Background Modal"
      >
        <div className="backgroundModalH2">
          <h2>배경화면 업로드</h2>
          {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}
        </div>
        <div className="backgroundModalWrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              이름: &nbsp;
              <input
                type="text"
                name="fileName"
                value={backgroundRequest.fileName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <label className="backgroundModalCustomFile">
              사진선택
              <input type="file" name="file" onChange={handleFileChange} />
            </label>
            <br />
            <br />

            {/* 이미지 미리보기 추가 */}

            {uploadFile ? (
              <div className="imagePreviewContainer">
                <img
                  src={URL.createObjectURL(uploadFile[0])}
                  alt="Image preview"
                  className="backgroundImagePreview"
                />
              </div>
            ) : (
              <div className="imagePreviewContainer"> </div>
            )}
            <p style={{ fontSize: "14px" }}>이미지 미리보기</p>

            <br />
            <br />
            <button type="submit" className="backgroundModalSummit">
              업로드
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default BackgroundList;

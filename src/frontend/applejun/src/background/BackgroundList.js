import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import BackgroundDelete from "./BackgroundDelete";
import BackgroundUpload from "./BackgroundUpload";

// 모달 스타일 설정
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

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

  const [currentUser, setCurrentUser] = useState(0);

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        setCurrentUser(userObject.id);
        console.log(userObject.id);
      }
    };

    loadStoredUser();
  }, []);

  useEffect(() => {
    const fetchGetImageList = async (id) => {
      if (id !== 0) {
        // currentUser가 0이 아닌 경우에만 실행
        console.log(currentUser);
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

  const extractFileNameAddPath = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
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
        console.log("엄준식");
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

  return (
    <div>
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
      </div>
      <h2>배경화면 목록</h2>
      <button onClick={() => setModalIsOpen(true)}>사진 추가하기</button>
      <ul>
        {imageList && imageList.length > 0 ? (
          imageList.map((image, index) => (
            <li key={image.id}>
              <p>ID: {image.id}</p>
              <img
                src={`/background-image/${extractFileNameAddPath(
                  image.filePath
                )}`}
                alt={`Image ${index}`}
                style={{ maxWidth: "100%" }}
                onLoad={() => console.log("Image loaded successfully")}
                onError={() => console.error("Error loading image")}
              />
              <button onClick={() => deleteBackgroundImage(image.id)}>
                삭제
              </button>
            </li>
          ))
        ) : (
          <p>No images available</p>
        )}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Gps Update Modal"
      >
        <h2>배경화면 업로드</h2>
        {currentUser === 3 && <p>게스트 계정은 업로드 할 수 없습니다.</p>}

        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Name:
            <input
              type="text"
              name="fileName"
              value={backgroundRequest.fileName}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            File:
            <input type="file" name="file" onChange={handleFileChange} />
          </label>
          <br />
          <br />
          <button type="submit">업로드</button>
        </form>

        <br />
        <br />
        <br />
        <div>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
}

export default BackgroundList;

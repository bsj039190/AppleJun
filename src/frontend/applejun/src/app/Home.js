import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/app/Home.css";
import Modal from "react-modal";
import AccountUpdate from "../account/AccountUpdate";

// 모달 스타일 설정
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 6,
  },
};

Modal.setAppElement("#root");

function Home() {
  const [fileName, setFileName] = useState();
  //const { currentUser } = useUser();

  //왼쪽에는 나, 오른쪽에는 수연이
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});
  const [leftProfileImage, setLeftProfileImage] = useState(
    "src/frontend/applejun/public/profile-image/7296f7ea-bc04-4029-a3cc-0cef5c7521c7_DSC01076.JPG"
  );
  const [rightProfileImage, setRightProfileImage] = useState(
    "src/frontend/applejun/public/profile-image/643b3d5e-0d6c-42e9-a767-df03b95c2422_defaultProfile.jpg"
  );
  const [selectedProfile, setSelectedProfile] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState();
  const [previewImage, setPreviewImage] = useState("");

  const [currentUser, setCurrentUser] = useState(0);

  const [startDate, setStartDate] = useState(new Date("2023-05-21"));
  const [endDate, setEndDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [today, setToday] = useState({});

  const joinButtonHandler = () => {
    alert("회원가입은 관리자에게 직접 문의해주세요");
  };

  const extractFileNameAddPath = (filePath) => {
    if (filePath) {
      //원래는 replace가 맞지만 에러가 나서 직접 글자수로 잘라버림
      const fileName = filePath.substr(46);
      console.log(`background : ${fileName}`);

      return fileName;
    } else {
      console.log("안됨");
    }
  };

  const extractProfileImageName = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  const daysPassedCalculator = () => {
    // 시작 및 종료 날짜의 시간을 자정으로 설정
    const startMidnight = new Date(startDate);
    startMidnight.setHours(0, 0, 0, 0);

    const endMidnight = new Date(endDate);
    endMidnight.setHours(0, 0, 0, 0);

    const timeDifference = endMidnight.getTime() - startMidnight.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    console.log(endDate);

    setToday({
      year: endDate.getFullYear(),
      month: endDate.getMonth(),
      numDate: endDate.getDate(),
    });

    //시작일이 1일이기 때문에 +1을 함
    setDays(days + 1);
  };

  //const fetchProfileImage = async () => {};

  const handleProfileSubmit = async (e, selectedProfile) => {
    e.preventDefault();

    const isUpdated = await AccountUpdate(selectedProfile, uploadFile);

    if (isUpdated == 0) {
      alert("업로드 실패!");
    } else {
      window.location.reload();
    }

    console.log("엄준식");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProfile({
      ...selectedProfile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      setUploadFile(file);

      reader.readAsDataURL(file);
    }
  };

  //OpenModal
  const profileButtonClickHandler = (profile) => {
    console.log(profile.profileImage);
    setSelectedProfile(profile);
    console.log(profile);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchData = async () => {
    try {
      if (currentUser !== 3) {
        console.log(currentUser);

        const response = await axios.get(
          `http://localhost:8080/background/list/${currentUser}`,
          { withCredentials: true }
        );
        const imageList = response.data.contents;

        if (imageList.length > 0) {
          const randomIndex = Math.floor(Math.random() * imageList.length);
          const randomFilePath = imageList[randomIndex].filePath;

          // 파일 이름만 추출하여 state에 설정
          setFileName(extractFileNameAddPath(randomFilePath));
        }
      } else {
        //currentUser가 3일때
        console.log(currentUser);
        alert("게스트 계정은 ADMIN의 배경이 보입니다.");

        const response = await axios.get(
          `http://localhost:8080/background/list/1`,
          { withCredentials: true }
        );
        const imageList = response.data.contents;

        if (imageList.length > 0) {
          const randomIndex = Math.floor(Math.random() * imageList.length);
          const randomFilePath = imageList[randomIndex].filePath;

          // 파일 이름만 추출하여 state에 설정
          setFileName(extractFileNameAddPath(randomFilePath));
        }
      }

      const joon = await axios.get(`http://localhost:8080/account/get/1`, {
        withCredentials: true,
      });
      const joonData = joon.data.contents;
      if (joonData.profileImage !== null) {
        console.log(joonData.profileImage);
        setLeftProfileImage(joonData.profileImage);
      }

      if (joonData != null) {
        setLeft(joonData);
        console.log(joonData);
      } else {
        console.log("Fail to get BSJ");
      }

      const soo = await axios.get(`http://localhost:8080/account/get/2`, {
        withCredentials: true,
      });
      const sooData = soo.data.contents;

      if (sooData !== null) {
        setRightProfileImage(sooData.profileImage);
      }

      if (sooData != null) {
        setRight(sooData);
        console.log(sooData);

        daysPassedCalculator();
      } else {
        console.log("Fail to get LSY");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    if (currentUser !== 0) {
      fetchData();
    }
  }, [currentUser]); // currentUser가 디폴트인 0이 아닐때만 fetchData 실행

  return (
    <>
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
      <div className="homeContainer">
        <div>
          <div className="upperBar">
            <img src="logos/HomeButton.png" style={{ marginLeft: "376px" }} />
            <p>메인홈</p>

            <Link to="/">
              <button
                style={{
                  backgroundColor: "white",
                  color: "#fb92ab",
                  border: "none",
                }}
              >
                로그인
              </button>
            </Link>

            <Link to="/logout">
              <button
                style={{
                  backgroundColor: "white",
                  color: "#fb92ab",
                  border: "none",
                }}
              >
                로그아웃
              </button>
            </Link>

            <button
              onClick={joinButtonHandler}
              style={{
                marginRight: "376px",
                backgroundColor: "white",
                color: "#fb92ab",
                border: "none",
              }}
            >
              회원가입
            </button>
          </div>

          <div
            className="homeBackground"
            style={{
              backgroundImage: `url(/background-image/${fileName})`,
            }}
          >
            <div className="homeContent">
              <br />
              <br />
              <h3 style={{ color: "#FFFFFF", fontSize: "21px" }}>
                이키노피오와 사과승준
              </h3>
              <div className="profileContainer">
                <div className="profileGroup">{left.name}</div>
                <div className="profileGroup">
                  <button onClick={() => profileButtonClickHandler(left)}>
                    <img
                      src={`/profile-image/${extractProfileImageName(
                        leftProfileImage
                      )}`}
                      alt="leftProfile"
                      className="profileImage"
                    />
                  </button>
                </div>
                <img src="/logos/Heart.png" />
                <div className="profileGroup">
                  <button onClick={() => profileButtonClickHandler(right)}>
                    <img
                      src={`/profile-image/${extractProfileImageName(
                        rightProfileImage
                      )}`}
                      alt="rightProfile"
                      className="profileImage"
                    />
                  </button>
                </div>
                <div className="profileGroup">{right.name}</div>
              </div>

              <p className="daysText">{days}일</p>

              <p className="todayText">
                {today.year}.{today.month}.{today.numDate}
              </p>

              <div className="menuText">
                <h3>MENU</h3>
              </div>

              <div className="menuContainer">
                <div className="menuGroup">
                  <Link to="/post/get/list">
                    <img src="/logos/StoryList.png" />
                    <br />
                    <button>스토리 목록</button>
                  </Link>
                </div>

                <div className="menuGroup">
                  <Link to="/post/write">
                    <img src="/logos/StoryWrite.png" />
                    <br />
                    <button>스토리 작성</button>
                  </Link>
                </div>

                <div className="menuGroup">
                  <Link to="/map/list">
                    <img src="/logos/Map.png" />
                    <br />
                    <button style={{ marginBottom: "5px" }}>지도</button>
                  </Link>
                  <Link to="/map/text/list">
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "#fb92ab",
                        marginBottom: "2px",
                      }}
                    >
                      지도리스트
                    </button>
                  </Link>
                  <Link to="/map/create">
                    <button
                      style={{ backgroundColor: "white", color: "#fb92ab" }}
                    >
                      새로운 장소
                    </button>
                  </Link>
                </div>

                <div className="menuGroup">
                  <Link to="/background/list">
                    <img src="/logos/Background.png" />
                    <br />
                    <button>배경화면</button>
                  </Link>
                </div>

                <br />
                <br />
              </div>

              <br></br>
              <br></br>
              {/* <div>
                <h3>🖥️Source code on GitHub:</h3>
                <ul>
                  <li>
                    - &nbsp;
                    <a
                      href="https://github.com/bsj039190/AppleJun"
                      target="_blank"
                      rel="relrlerel"
                    >
                      AppleJun Repository
                    </a>
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h5>📧Contact me email</h5>- &nbsp;
                <a href="mailto:bsj039190@gmail.com">bsj039190@gmail.com</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Update Modal"
        className="customProfileModal"
      >
        <div style={{ display: "flex", alignItems: "left" }}>
          <p
            style={{
              marginTop: "-50px",
              marginLeft: "0",
              color: "#55A6FF",
              fontSize: "21px",
            }}
          >
            프로필 수정
          </p>
        </div>

        {/* 이미지 미리보기 */}
        {selectedProfile.profileImage && (
          <div className="imageUploadContainer">
            <img
              src={
                previewImage ||
                `/profile-image/${extractProfileImageName(
                  selectedProfile.profileImage
                )}`
              }
              alt="prevProfileImage"
              className="imageUploadStyle"
              onError={() => console.log("Preview Profile Image Error!")}
            />
          </div>
        )}

        <label>ID: {selectedProfile.id}</label>
        <br />
        <br />
        <label style={{ fontSize: "18px" }}>
          이름 <br />
          <input
            type="text"
            name="name"
            value={selectedProfile.name}
            onChange={handleInputChange}
            className="modalInput"
          />
        </label>
        <br />
        <label style={{ fontSize: "18px" }}>
          E-mail <br />
          <input
            type="text"
            name="email"
            value={selectedProfile.email}
            onChange={handleInputChange}
            className="modalInput"
          />
        </label>
        <br />

        <div>
          <label
            className="customProfileButton"
            style={{ marginRight: "40px" }}
          >
            사진 변경
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
            />
          </label>

          <button
            onClick={(e) => handleProfileSubmit(e, selectedProfile)}
            className="customProfileButton"
            style={{ marginLeft: "45px" }}
          >
            저장
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Home;

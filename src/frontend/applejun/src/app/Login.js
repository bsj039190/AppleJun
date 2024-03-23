import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { useUser } from "../account/UserContext";
import "../css/app/Login.css";
import "../css/app/Background.css";

// 모달 스타일 설정
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zindex: 3,
  },
};
Modal.setAppElement("#root");

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("GUEST");
  const [password, setPassword] = useState("0000");
  const [id, setId] = useState(3);
  const [remember, setRemember] = useState("on");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setCurrentUser } = useUser();

  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  const extractProfileImageName = (filePath) => {
    // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
    const parts = filePath.split(/[\\/]/);

    // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
    return parts.pop();
  };

  const goToHome = () => {
    history.push("/home");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loginMethod = (name) => {
    if (name === "BSJ") {
      setId(1);
      setPassword("");
    } else if (name === "LSY") {
      setId(2);
      setPassword("");
    } else {
      setId(3);
      setPassword("0000");
    }
    setUsername(name);
    setModalIsOpen(true);
    console.log(modalIsOpen);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    console.log(`Login id : ${id}`);

    try {
      const params = new URLSearchParams();
      params.append("account", username);
      params.append("password", password);
      params.append("remember", remember); // 항상 on으로 설정

      const response = await axios.post(
        "http://localhost:8080/login",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      console.log(response.data); // 로그인 성공 시 서버에서 반환하는 데이터 처리
      // 성공 시 필요한 동작을 수행 (예: 리다이렉트 등)
      alert("로그인 성공!");
      setCurrentUser({ username: username, id: id });
      history.push("/home");
    } catch (err) {
      console.error("Login failed:", err);
      // 실패 시 필요한 동작을 수행 (예: 에러 메시지 표시 등)
    }
  };

  const fetchData = async () => {
    try {
      const apiResponse = await axios.get(
        "http://localhost:8080/account/get/list"
      );
      console.log(apiResponse);

      for (let i = 0; i < apiResponse.data.contents.length; i++) {
        const data = apiResponse.data.contents[i];
        if (data.id === 1) {
          const joon = extractProfileImageName(data.profileImage);
          setLeft(joon);
        } else if (data.id === 2) {
          const soo = extractProfileImageName(data.profileImage);
          setRight(soo);
          console.log("Soo:", soo);
        }
      }
    } catch (error) {
      console.log("um");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <div id="n_1920__10" className="gradient-background">
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
        <svg className="n_57_v">
          <linearGradient
            id="n_57_v"
            spreadMethod="pad"
            x1="-0.007"
            x2="1"
            y1="0.618"
            y2="0.622"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="1"></stop>
            <stop offset="0.364" stopColor="#fff" stopOpacity="0.871"></stop>
            <stop offset="0.6694" stopColor="#fff" stopOpacity="0.584"></stop>
            <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
          <rect
            id="n_57_v"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="811"
            height="1174"
          ></rect>
        </svg>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div className="loginTextContainer">
          <p>프로필을 선택하세요</p>
        </div>
        <div className="loginContainer">
          <button className="loginButton" onClick={() => loginMethod("BSJ")}>
            <img src={`/profile-image/${left}`} alt="leftProfile" />
            승준
          </button>
          <button className="loginButton" onClick={() => loginMethod("LSY")}>
            <img src={`/profile-image/${right}`} alt="rightProfile" />
            수연
          </button>
          <button className="loginButton" onClick={(e) => handleSubmitLogin(e)}>
            <img src={`/profile-image/defaultProfile.jpg`} alt="guestProfile" />
            Guest
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Login Method"
      >
        <div className="modal-content">
          <h2>Login</h2>
          <form onSubmit={(e) => handleSubmitLogin(e)}>
            <p>접속 아이디 : {username}</p>
            {username === "GUEST" && <p>게스트 비밀번호는 0000입니다.</p>}
            <p>Password</p>
            <label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit">로그인</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import AuthWithBack from "./AuthWithBack";

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

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState("on");
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const goToHome = () => {
    history.push("/home");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loginMethod = (id) => {
    setUsername(id);
    setModalIsOpen(true);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPassword({
  //     ...login,
  //     [name]: value,
  //   });
  // };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    try {
      const params = new URLSearchParams();
      params.append("account", username);
      params.append("password", password);
      params.append("remember", remember); // 항상 true로 설정

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
      history.push("/home");
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed:", err);
      // 실패 시 필요한 동작을 수행 (예: 에러 메시지 표시 등)
    }
  };

  //8080에서는 쿠키가 들어가는데 3000에서는 쿠키가 안나옴

  return (
    <div>
      <div>
        <button onClick={() => goToHome()}>홈으로</button>
      </div>
      <br />
      <br />
      <br />
      <button onClick={() => loginMethod("BSJ")}>승준</button>
      <button onClick={() => loginMethod("LSY")}>수연</button>
      <button onClick={() => loginMethod("GUEST")}>Guest</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Method"
      >
        <h2>LogIn</h2>
        <form onSubmit={(e) => handleSubmitLogin(e)}>
          <p>접속 아이디 : {username}</p>
          {username === "GUEST" && <p>게스트 비밀번호는 0000입니다.</p>}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">로그인</button>
        </form>
      </Modal>
    </div>
  );
}

export default Login;
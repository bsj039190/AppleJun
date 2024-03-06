import { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { useUser } from "../account/UserContext";

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
  const [username, setUsername] = useState("GUEST");
  const [password, setPassword] = useState("0000");
  const [id, setId] = useState(3);
  const [remember, setRemember] = useState("on");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setCurrentUser } = useUser();

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
      <button onClick={(e) => handleSubmitLogin(e)}>Guest</button>

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

import { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
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
  const [login, setLogin] = useState({
    id: 0,
    password: "0000",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const goToHome = () => {
    history.push("/home");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loginMethod = (id) => {
    setLogin({ ...login, id: id });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e, login) => {
    e.preventDefault();

    AuthWithBack();

    console.log(login);
  };

  return (
    <div>
      <div>
        <button onClick={() => goToHome()}>홈으로</button>
      </div>
      <br />
      <br />
      <br />
      <button onClick={() => loginMethod(1)}>승준</button>
      <button onClick={() => loginMethod(2)}>수연</button>
      <button>Guest</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Method"
      >
        <h2>LogIn</h2>
        <form onSubmit={(e) => handleSubmitLogin(e, login)}>
          <p>접속 아이디 : {login.id}</p>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">로그인</button>
        </form>
      </Modal>
    </div>
  );
}

export default Login;

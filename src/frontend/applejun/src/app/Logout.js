import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      const response = await axios.post("/logout");

      // 로그아웃이 성공하면 적절한 동작 수행
      alert("로그아웃 성공!");
      history.push("/");
    } catch (error) {
      // 로그아웃이 실패하면 에러 처리
      console.error("Logout failed:", error);
      alert("로그아웃 실패");
      history.push("/home");
    }
  };

  // 컴포넌트가 로드될 때 자동으로 로그아웃 실행
  useEffect(() => {
    handleLogout();
  }, []); // 빈 배열은 컴포넌트가 처음 로드될 때 한 번만 실행됨

  return (
    <div>
      {/* 필요에 따라 로그아웃 성공 여부에 대한 메시지 또는 다른 UI를 추가할 수 있음 */}
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

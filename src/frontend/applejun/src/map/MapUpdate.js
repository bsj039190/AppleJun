import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MapUpdate({ gps }) {
  const [isOpen, setIsOpen] = useState(false); // 초기값을 false로 변경

  useEffect(() => {
    console.log("엄");

    const timer = setTimeout(() => {
      setIsOpen(true);
      console.log("준");
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsOpen]); // setIsOpen을 의존성 배열에 추가

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log("엄준식");

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <h1>Update GPS</h1>
        <p>ID: {gps.id}</p>
        {/* 기타 정보 출력 */}
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default MapUpdate;

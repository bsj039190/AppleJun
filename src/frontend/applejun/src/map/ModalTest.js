import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ModalTest({ gps, closeModal }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Modal isOpen={true} onRequestClose={closeModal}>
        <h1>Update GPS</h1>
        <p>ID: {gps.id}</p>
        {/* 기타 정보 출력 */}
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default ModalTest;

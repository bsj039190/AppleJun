import React, { useState, useEffect } from "react";

const Account = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    // 랜덤 숫자 생성 함수
    const generateRandomNumber = () => {
      return Math.floor(Math.random() * 100); // 0부터 99까지의 랜덤 숫자
    };

    // 페이지가 처음 로드될 때와 매 렌더링 시마다 랜덤 숫자 업데이트
    setRandomNumber(generateRandomNumber());
  }, []);

  return (
    <div>
      <h2>Your Random Number: {randomNumber}</h2>
    </div>
  );
};

export default Account;

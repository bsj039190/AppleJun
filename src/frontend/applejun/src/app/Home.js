import React, { useState, useEffect } from "react";
import { useUser } from "../account/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";

function Home() {
  const [fileName, setFileName] = useState();
  const { currentUser } = useUser();

  //왼쪽에는 나, 오른쪽에는 수연이
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  //const [currentId, setCurrentId] = useState(currentUser.id);

  const [startDate, setStartDate] = useState(new Date("2023-05-21"));
  const [endDate, setEndDate] = useState(new Date());
  const [days, setDays] = useState(0);

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

  const daysPassedCalculator = () => {
    // 시작 및 종료 날짜의 시간을 자정으로 설정
    const startMidnight = new Date(startDate);
    startMidnight.setHours(0, 0, 0, 0);

    const endMidnight = new Date(endDate);
    endMidnight.setHours(0, 0, 0, 0);

    const timeDifference = endMidnight.getTime() - startMidnight.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    console.log(endDate);

    //시작일이 1일이기 때문에 +1을 함
    setDays(days + 1);
  };

  // 컴포넌트 렌더링 시 한 번만 실행
  const fetchData = async () => {
    try {
      const id = currentUser.id;
      console.log(id);

      const response = await axios.get(
        `http://localhost:8080/background/list/${id}`,
        { withCredentials: true }
      );
      const imageList = response.data.contents;

      if (imageList.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageList.length);
        const randomFilePath = imageList[randomIndex].filePath;

        // 파일 이름만 추출하여 state에 설정
        setFileName(extractFileNameAddPath(randomFilePath));
      }

      const joon = await axios.get(`http://localhost:8080/account/get/1`, {
        withCredentials: true,
      });
      const joonData = joon.data.contents;

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
    fetchData();
  }, [currentUser]); // currentUser가 변경될 때마다 fetchData 실행

  return (
    <div className="container">
      <div>
        <h1>Welcome to AppleJun's Board!</h1>
        <p>홈화면</p>

        <div>
          <Link to="/home">
            <button>메인화면</button>
          </Link>
        </div>

        <Link to="/">
          <button>로그인</button>
        </Link>

        <Link to="/logout">
          <button>로그아웃</button>
        </Link>

        <button onClick={joinButtonHandler}>회원가입</button>

        <hr />
        <p>
          {left.name} ❤️ {right.name}
        </p>
        <p>{days}</p>

        <h3>MENU</h3>

        <p>📋 게시판</p>
        <div>
          <Link to="/post/get/list">
            <button>Go to Board List</button>
          </Link>
        </div>

        <div>
          <Link to="/post/write">
            <button>Go to Write Post</button>
          </Link>
        </div>

        <br />

        <p>🗺️ 지도</p>
        <div>
          <Link to="/map/list">
            <button>Go to Map</button>
          </Link>
        </div>

        <div>
          <Link to="/map/text/list">
            <button>Go to Map List</button>
          </Link>
        </div>

        <div>
          <Link to="/map/create">
            <button>Create Map Point</button>
          </Link>
        </div>

        <p>🎞️ 배경화면</p>
        <div>
          <Link to="/background/list">
            <button>Background</button>
          </Link>
        </div>

        <br />
        <br />

        <p>배경화면</p>
        <img
          className="background"
          src={`/background-image/${fileName}`}
          alt="background"
        />

        <br></br>
        <br></br>
        <div>
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
        </div>
      </div>
    </div>
  );
}

export default Home;

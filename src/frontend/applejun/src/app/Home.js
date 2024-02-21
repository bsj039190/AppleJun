import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const joinButtonHandler = () => {
    alert("회원가입은 관리자에게 직접 문의해주세요");
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to AppleJun's Board!</h1>
        <p className="lead">홈화면</p>

        <div>
          <Link to="/">
            <button>메인화면</button>
          </Link>
        </div>

        <Link to="/login">
          <button>로그인</button>
        </Link>

        <button onClick={joinButtonHandler}>회원가입</button>

        <hr className="my-4" />
        <h3>MENU</h3>

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

        <div>
          <Link to="/map/list">
            <button>Go to Map</button>
          </Link>
        </div>

        <div>
          <Link to="map/naver">
            <button>Go to NaverMap</button>
          </Link>
        </div>

        <br></br>
        <br></br>
        <div className="mt-4">
          <h3>🖥️Source code on GitHub:</h3>
          <ul>
            <li>
              - &nbsp;
              <a
                href="https://github.com/bsj039190/AppleJun"
                target="_blank"
                rel="noopener noreferrer"
              >
                AppleJun Repository
              </a>
            </li>
          </ul>
        </div>
        <br></br>
        <div className="mt-4">
          <h5>📧Contact me email</h5>- &nbsp;
          <a href="mailto:bsj039190@gmail.com">bsj039190@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

export default Home;

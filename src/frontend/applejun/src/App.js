import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Main from "./app/Main";
import { NavermapsProvider } from "react-naver-maps";

function App() {
  return (
    <div>
      <Router>
        <NavermapsProvider ncpClientId="f5z13y2f41">
          <Main />
        </NavermapsProvider>
      </Router>
      {console.log("Main Render in App.js")}
    </div>
  );
}

export default App;

/*
function App() {
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    fetch("/api/hello")
        .then((res) => {return res.json();})
        .then((data) => {setMsg(data);})
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {msg.map((content, idx) => <li key={`${idx} - ${content}`}>{content}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;*/

/*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/

/*const [msg, setMsg] = useState([]);
  const [prevMsg, setPrevMsg] = useState([]);

  useEffect(() => {
    fetch("/aaa")
      .then((res) => res.text()) // text() 메소드를 사용하여 문자열 형식으로 응답을 받음
      .then((data) => {
        console.log(data); // 콘솔에 데이터 출력
        console.log("Um");
        setMsg([data]); // 문자열을 배열로 감싸서 상태 업데이트
      });
  }, []);

  useEffect(() => {
    fetch("/bbb")
      .then((res) => res.text()) // text() 메소드를 사용하여 문자열 형식으로 응답을 받음
      .then((data) => {
        console.log(data); // 콘솔에 데이터 출력
        console.log("엥");
        setPrevMsg([data]); // 문자열을 배열로 감싸서 상태 업데이트
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {msg.map((content, idx) => (
            <li key={`${idx} - ${content}`}>{content}</li>
          ))}
        </ul>
        <ul>
          {msg.map((content, idx) => (
            <li key={`${idx} - ${content}`}>{content}</li>
          ))}
        </ul>
      </header>
    </div>
  ); */

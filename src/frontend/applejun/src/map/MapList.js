import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";
import axios from "axios";
import MapUpdate from "./MapUpdate";
import MapDelete from "./MapDelete";

// ContentsResponse 클래스의 구조와 유사한 React 응답 형식을 정의
class ApiResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}

function MapList() {
  const navermaps = useNavermaps();
  const history = useHistory();
  const [markerPositions, setMarkerPositions] = useState([]);
  const [gpsList, setGpsList] = useState([]);

  useEffect(() => {
    const response = axios
      .get("http://localhost:8080/gps/get/list")
      .then((response) => {
        console.log(response.data.contents);

        for (const gps of response.data.contents) {
          // gps의 아이디가 1이면 건너뛰기
          if (gps.id === 1) {
            continue;
          }

          setGpsList((prevGps) => [...prevGps, gps]);

          navermaps.Service.geocode(
            {
              address: gps.address,
            },
            function (status, response) {
              if (status !== navermaps.Service.Status.OK) {
                console.log("error");
                return alert("Something wrong!");
              }

              console.log(response.result);

              const result = response.result;
              const items = result.items;

              // 좌표를 state에 저장
              setMarkerPositions((prevPositions) => [
                ...prevPositions,
                new navermaps.LatLng(items[0].point.y, items[0].point.x),
              ]);
            }
          );
        }
      });
  }, [navermaps.Service]); // useEffect가 한 번만 실행되도록 빈 배열을 전달

  function openUpdateFloating() {
    const newWindow = window.open(
      "MapUpdate.js",
      "_blank",
      "width=500,height=300"
    );
  }

  return (
    <>
      <Container
        style={{
          width: "80%",
          height: "700px",
        }}
      >
        {/* <Headers /> */}

        <NaverMap
          id="map" //중심점은 그냥 눈대중으로 함
          defaultCenter={new navermaps.LatLng(37.5121391, 126.8426069)}
          defaultZoom={11}
        >
          {/* 서버에서 가져온 Gps 목록에 대해 각각 마커를 생성 */}
          {markerPositions.map((position, index) => (
            <Marker key={index} position={position} animation={2} />
          ))}
        </NaverMap>
      </Container>
      <div>
        <button onClick={() => history.push(`/`)}>홈으로</button>
      </div>

      <h2>GPS List</h2>
      {gpsList.map((gps) => (
        <ul key={gps.id}>
          <p>
            ID: {gps.id} / 이름: {gps.name} / 주소: {gps.address}{" "}
            <button onClick={MapUpdate}>수정</button>
            <button onClick={MapDelete}>삭제</button>
          </p>
        </ul>
      ))}

      {/* {postList.map((post) => (
        <li key={post.id}>
          
          <p>ID: {post.id}</p>
          <Link to={`/post/get/${post.id}`}>
            <p>제목: {post.title}</p>
          </Link>
        </li>
      ))} */}
    </>
  );
}

export default MapList;

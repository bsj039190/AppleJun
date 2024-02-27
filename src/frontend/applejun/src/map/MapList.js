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
import ModalTest from "./ModalTest";
import ReactDOM from "react-dom"; // ReactDOM 추가
import Modal from "react-modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
            <Marker
              key={index}
              position={position}
              animation={position ? 2 : null}
            />
          ))}
        </NaverMap>
      </Container>
      <div>
        <button onClick={() => history.push(`/`)}>홈으로</button>
        <Link to="/map/text/list">
          <button>리스트로 보기</button>
        </Link>
      </div>

      <h2>GPS List</h2>
      {gpsList.map((gps) => (
        <ul key={gps.id}>
          <p>
            ID: {gps.id} / 이름: {gps.name} / 주소: {gps.address}{" "}
            <button>수정</button>
            <button onClick={MapDelete}>삭제</button>
          </p>
        </ul>
      ))}
    </>
  );
}

export default MapList;

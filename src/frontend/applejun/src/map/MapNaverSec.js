import React, { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";
import axios from "axios";

// ContentsResponse 클래스의 구조와 유사한 React 응답 형식을 정의
class ApiResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}

function MapNaverSec() {
  const navermaps = useNavermaps();
  const [markerPositions, setMarkerPositions] = useState([]);

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
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 전달

  return (
    <Container
      style={{
        width: "80%",
        height: "600px",
      }}
    >
      <NaverMap
        id="map"
        defaultCenter={new navermaps.LatLng(37.3584704, 127.105399)}
        defaultZoom={8}
      >
        {/* 서버에서 가져온 Gps 목록에 대해 각각 마커를 생성 */}
        {markerPositions.map((position, index) => (
          <Marker key={index} position={position} animation={2} />
        ))}
      </NaverMap>
    </Container>
  );
}

export default MapNaverSec;

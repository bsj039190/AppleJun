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

function ModalTest() {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null); // map 상태 추가
  const [markerPositions, setMarkerPositions] = useState([]);

  const [gpsList, setGpsList] = useState([]);

  const [showOverlay, setShowOverlay] = useState(false); // 추가된 부분
  const [selectedGps, setSelectedGps] = useState(null); // 추가된 부분

  useEffect(() => {
    const response = axios
      .get("http://localhost:8080/gps/get/list", { withCredentials: true })
      .then((response) => {
        console.log(response.data.contents);

        for (const gps of response.data.contents) {
          // gps의 아이디가 1이면 건너뛰기
          if (gps.id === 1) {
            continue;
          }

          console.log(gps);

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

  const handleMarkerClick = (index) => {
    const clickedGps = gpsList[index];

    if (clickedGps && clickedGps.gpsLat && clickedGps.gpsLng) {
      setSelectedGps(clickedGps);
      console.log(clickedGps);
    } else {
      console.error("잘못된 GPS 데이터:", clickedGps);
    }
  };

  const logging = () => {
    console.log(markerPositions);
  };

  return (
    <div>
      <Container
        style={{
          width: "80%",
          height: "600px",
        }}
      >
        <NaverMap
          id="map"
          defaultCenter={new navermaps.LatLng(37.5121391, 126.8426069)}
          defaultZoom={11}
          onInit={(map, naver) => setMap(map)}
        >
          {/* 서버에서 가져온 Gps 목록에 대해 각각 마커를 생성 */}
          {markerPositions.map((position, index) => (
            <Marker
              key={index}
              position={position}
              animation={0}
              onClick={() => handleMarkerClick(index)}
            />
          ))}
        </NaverMap>
      </Container>
      <button onClick={() => logging()}>markerPosition</button>
    </div>
  );
}

export default ModalTest;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
  Overlay,
} from "react-naver-maps";
import axios from "axios";
import MapUpdate from "./MapUpdate";
import MapDelete from "./MapDelete";
import ModalTest from "./ModalTest";
import ReactDOM from "react-dom"; // ReactDOM 추가
import Modal from "react-modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

//
// 이 파일이 지도 구현 파일임!
//

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

  // 마커를 클릭했을 때 인포윈도우를 열기 위한 함수
  const handleMarkerClick = (gps) => {
    if (gps && gps.gpsLat && gps.gpsLng) {
      setSelectedGps(gps);
      setShowOverlay(true);
      console.log(gps);
    } else {
      console.error("잘못된 GPS 데이터:", gps);
    }
  };
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
              animation={0}
              onClick={() => handleMarkerClick(gpsList[index])}
            />
          ))}
          {/* Overlay 추가 */}
          {showOverlay &&
            selectedGps &&
            selectedGps.gpsLat &&
            selectedGps.gpsLng && (
              <Overlay
                position={
                  new navermaps.LatLng(selectedGps.lat, selectedGps.lng)
                }
                onClick={() => setShowOverlay(false)}
              >
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    zIndex: 10,
                  }}
                >
                  <h3>{selectedGps.name}</h3>
                  <p>{selectedGps.address}</p>
                  {/* 원하는 정보를 추가할 수 있음 */}
                </div>
              </Overlay>
            )}
        </NaverMap>
      </Container>
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
        <Link to="/map/text/list">
          <button>리스트로 보기</button>
        </Link>
      </div>
    </>
  );
}

export default MapList;

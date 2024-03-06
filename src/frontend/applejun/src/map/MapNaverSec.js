import React, { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
  Overlay,
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

  const [gpsList, setGpsList] = useState([]);

  const [showOverlay, setShowOverlay] = useState(false); // 추가된 부분
  const [selectedGps, setSelectedGps] = useState(null); // 추가된 부분

  const infoWindowOptions = {
    content:
      '<div style="width:200px;text-align:center;padding:10px;"><b>서울남산타워</b><br> - 네이버 지도 - </div>',
  };

  const infoWindow = new navermaps.InfoWindow(infoWindowOptions);

  useEffect(() => {
    const response = axios
      .get("http://localhost:8080/gps/get/list", { withCredentials: true })
      .then((response) => {
        console.log(response.data.contents);

        for (const gps of response.data.contents) {
          // gps의 아이디가 1이면 건너뛰기
          // if (gps.id === 1) {
          //   continue;
          // }

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
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 전달

  // 마커를 클릭했을 때 인포윈도우를 열기 위한 함수
  const handleMarkerClick = (gps) => {
    if (gps && gps.gpsLat && gps.gpsLng) {
      setSelectedGps(gps);

      // // 동적인 정보를 표시하는 HTML 문자열을 생성
      // const dynamicContent = `
      //   <div style="width:200px;text-align:center;padding:10px;">
      //     <b>${gps.name}</b><br>
      //     주소: ${gps.address}<br>
      //     추가 정보: ${gps.additionalInfo}
      //   </div>
      // `;

      // // InfoWindow의 content를 동적인 정보로 업데이트하고 열기
      // infoWindow.setContent(dynamicContent);
      // infoWindow.open();
      console.log(gps);
    } else {
      console.error("잘못된 GPS 데이터:", gps);
    }
  };

  return (
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
      </NaverMap>
    </Container>
  );
}

export default MapNaverSec;

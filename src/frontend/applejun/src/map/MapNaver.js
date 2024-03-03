import React, { useEffect, useState } from "react";
import { NaverMap, Marker, useNavermaps, Container } from "react-naver-maps";
import axios from "axios";

// ContentsResponse 클래스의 구조와 유사한 React 응답 형식을 정의
class ApiResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}

function MapNaver() {
  const navermaps = useNavermaps();
  const [markerPositions, setMarkerPositions] = useState([]);

  useEffect(() => {
    // Gps 목록을 가져오는 함수 호출
    getGpsList();
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 전달

  const getGpsList = async () => {
    try {
      // Pageable 파라미터를 추가하여 Axios로 데이터 가져오기
      const response = await axios.get("http://localhost:8080/gps/get/list", {
        withCredentials: true,
      });

      // Axios로 가져온 데이터는 data 속성에 있음
      const apiResponse = response.data;

      console.log(apiResponse);

      // 가져온 Gps 목록을 이용하여 마커 위치 배열 생성
      const positions = await Promise.all(
        apiResponse.contents.map(async (gps) => {
          try {
            console.log(gps);
            // 주소를 이용하여 geocode를 요청
            const geocodeResponse = await navermaps.Service.geocode({
              address: gps.address,
            });

            console.log("엄");
            console.log(geocodeResponse);
            console.log("준");

            // geocode 응답에서 위도와 경도 추출
            const coordinates = geocodeResponse.addresses[0];
            const lat = parseFloat(coordinates.y);
            const lng = parseFloat(coordinates.x);

            return { lat, lng };
          } catch (error) {
            console.error(error);
            // 에러가 발생하면 기본 위치를 반환하거나 다른 처리를 수행할 수 있습니다.
            return { lat: 0, lng: 0 };
          }
        })
      );

      // 첫 번째 마커를 제외한 나머지 마커들만 저장
      // 첫 번째 마커는 더미 데이터임
      const restOfMarkers = positions.slice(1);

      // 좌표를 state에 저장
      setMarkerPositions(restOfMarkers);
      console.log(positions);
    } catch (error) {
      console.error("Error fetching GPS data:", error);
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
        defaultCenter={new navermaps.LatLng(37.3584704, 127.105399)}
        defaultZoom={8}
      >
        {/* 서버에서 가져온 Gps 목록에 대해 각각 마커를 생성 */}
        {markerPositions.map((position, index) => (
          <Marker
            key={index + 1}
            position={new navermaps.LatLng(position.lat, position.lng)}
            animation={null}
          />
        ))}
      </NaverMap>
    </Container>
  );
}

export default MapNaver;

import React, { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";

function MapList() {
  const navermaps = useNavermaps();
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    navermaps.Service.geocode(
      {
        address: "인천광역시 장승남로 70-30",
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
        setMarkerPosition(
          new navermaps.LatLng(items[0].point.y, items[0].point.x)
        );
      }
    );
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
        defaultZoom={10}
      >
        {markerPosition && (
          <Marker position={markerPosition} animation={null} />
        )}
      </NaverMap>
    </Container>
  );
}

export default MapList;

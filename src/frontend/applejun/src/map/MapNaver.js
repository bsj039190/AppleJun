import React from "react";
import { Container, NaverMap, Marker } from "react-naver-maps";

function MapNaver() {
  const navermaps = window.naver.maps;

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
        defaultZoom={18}
      >
        <Marker
          position={new navermaps.LatLng(37.3588, 127.10525)}
          animation={null}
        />
      </NaverMap>
    </Container>
  );
}

export default MapNaver;

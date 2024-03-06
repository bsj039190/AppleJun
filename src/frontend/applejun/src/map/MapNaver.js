import React, { useState } from "react";
import { NaverMap, Marker, InfoWindow, Container } from "react-naver-maps";

const MapNaver = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const [infoWindow, setInfoWindow] = useState({
    position: null,
    visible: false,
    content: "이것은 인포윈도우입니다",
  });

  const handleMarkerClick = (marker) => {
    console.log("마커 클릭됨");

    setInfoWindow({
      position: marker.overlay.position,
      visible: true,
      content: "이것은 인포윈도우입니다",
    });
  };

  const handleInfoWindowClose = () => {
    setInfoWindow({
      ...infoWindow,
      visible: false,
    });
  };

  return (
    <Container style={{ width: "100%", height: "400px" }}>
      <NaverMap defaultCenter={markerPosition} defaultZoom={13}>
        <Marker
          position={markerPosition}
          onClick={(marker) => handleMarkerClick(marker)}
        />

        {infoWindow.visible && (
          <InfoWindow
            position={infoWindow.position}
            onCloseClick={() => handleInfoWindowClose()}
            style={{
              border: "2px solid #ccc",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            <div>{infoWindow.content}</div>
          </InfoWindow>
        )}
      </NaverMap>
    </Container>
  );
};

export default MapNaver;

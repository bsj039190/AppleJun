import React, { useEffect, useState } from "react";
import { NaverMap, Marker, InfoWindow, useNavermaps } from "react-naver-maps";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Modal from "react-modal";
// 모달 스타일 설정
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const MapList = () => {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const navermaps = useNavermaps();
  const [apiResponse, setApiResponse] = useState(null);
  const history = useHistory();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchData = async () => {
    if (apiResponse === null) {
      try {
        const response = await axios.get("http://localhost:8080/gps/get/list", {
          withCredentials: true,
        });
        console.log(response);
        setApiResponse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData(); // 함수 호출

    if (apiResponse !== null) {
      console.log(apiResponse);

      // map 변수 선언
      const mapInstance = new navermaps.Map("map", {
        center: new navermaps.LatLng(37.5121391, 126.8426069),
        zoom: 10,
      });

      // map 상태 업데이트
      setMap(mapInstance);

      const newMarkers = [];
      const newInfoWindows = [];

      const locations = apiResponse.data.contents;
      console.log(locations);

      locations.forEach((location, index) => {
        if (location.id !== 1) {
          const position = new navermaps.LatLng(
            location.gpsLat,
            location.gpsLng
          );

          const marker = new navermaps.Marker({
            map: mapInstance,
            position,
            title: `Marker ${index + 1}`,
            zIndex: 100,
          });

          const infoWindow = new navermaps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:10px;">${location.name} <br /> ${location.subject}</div>`,
            url: location.url,
          });

          newMarkers.push(marker);
          newInfoWindows.push(infoWindow);
        }
      });

      setMarkers(newMarkers);
      setInfoWindows(newInfoWindows);

      navermaps.Event.addListener(mapInstance, "idle", function () {
        updateMarkers(mapInstance, newMarkers);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse]);

  function updateMarkers(mapInstance, markers) {
    const mapBounds = mapInstance.getBounds();
    markers.forEach((marker) => {
      const position = marker.getPosition();
      if (mapBounds.hasLatLng(position)) {
        showMarker(mapInstance, marker);
      } else {
        hideMarker(mapInstance, marker);
      }
    });
  }

  function showMarker(mapInstance, marker) {
    if (marker.setMap()) return;
    marker.setMap(mapInstance);
  }

  function hideMarker(mapInstance, marker) {
    if (!marker.setMap()) return;
    marker.setMap(null);
  }

  function getMouseOverHandler(seq, mapInstance) {
    return function (e) {
      const overedMarker = markers[seq];
      const infoWindow = infoWindows[seq];

      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(mapInstance, overedMarker);
      }
    };
  }

  function getMouseOutHandler(seq, mapInstance) {
    return function (e) {
      const infoWindow = infoWindows[seq];
      if (infoWindow.getMap()) {
        infoWindow.close();
      }
    };
  }

  function getMouseClickHandler(seq, mapInstance) {
    return function (e) {
      console.log(infoWindows[seq].url);
      const url = infoWindows[seq].url;
      alert("해당 url로 이동합니다");
      // window.open(url, "_blank");
      setModalIsOpen(true);
    };
  }

  useEffect(() => {
    markers.forEach((marker, index) => {
      navermaps.Event.addListener(
        marker,
        "mouseover",
        getMouseOverHandler(index, map)
      );

      navermaps.Event.addListener(
        marker,
        "mouseout",
        getMouseOutHandler(index, map)
      );

      navermaps.Event.addListener(
        marker,
        "click",
        getMouseClickHandler(index, map) // map 대신 map 상태를 전달
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, navermaps, map]);

  //OpenModal
  const profileButtonClickHandler = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div id="map" style={{ width: "100%", height: "500px" }} />
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
        <Link to="/map/text/list">
          <button>리스트로 보기</button>
        </Link>
        <button onClick={() => profileButtonClickHandler()}>Modal</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Profile Update Modal"
      >
        <h2>엄준식</h2>
      </Modal>
    </>
  );
};

export default MapList;

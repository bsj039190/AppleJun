import React, { useEffect, useState } from "react";
import { NaverMap, Marker, InfoWindow, useNavermaps } from "react-naver-maps";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ModalTest = () => {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const navermaps = useNavermaps();
  const [apiResponse, setApiResponse] = useState(null);
  const history = useHistory();

  const fetchData = async () => {
    if (apiResponse === null) {
      try {
        const response = await axios.get("http://localhost:8080/gps/get/list", {
          withCredentials: true,
        });
        setApiResponse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData(); // 함수 호출

    if (apiResponse !== null) {
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
      const url = infoWindows[seq].url;
      alert("해당 url로 이동합니다");
      window.open(url, "_blank");
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

  return (
    <>
      <div id="map" style={{ width: "100%", height: "500px" }} />
      <div>
        <button onClick={() => history.push(`/home`)}>홈으로</button>
        <Link to="/map/text/list">
          <button>리스트로 보기</button>
        </Link>
      </div>
    </>
  );
};

export default ModalTest;

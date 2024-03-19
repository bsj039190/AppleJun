import React, { useEffect, useState } from "react";
import { NaverMap, Marker, InfoWindow, useNavermaps } from "react-naver-maps";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Modal from "react-modal";
import MapDelete from "./MapDelete";
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
  const [selectedGps, setSelectedGps] = useState({
    id: "2",
    name: "Default Name",
    address: "장승남로 70-30",
    date: "2000-01-01",
    gpsLat: 37.4436635,
    gpsLng: 126.7390452,
    subject: "Default Subject",
    url: "http://www.naver.com",
  });

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

  //이벤트 리스너 함수들
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
      console.log(mapInstance);
      console.log(markers[seq].content.name);

      setSelectedGps(markers[seq].content);

      setModalIsOpen(true);
    };
  }

  function getMouseRightClickHandler(seq, mapInstance) {
    return function (e) {
      const url = infoWindows[seq].url;
      alert("해당 url로 이동합니다.");
      window.open(url, "_blank");
    };
  }

  //모달 함수들
  const markerClickHandler = () => {
    setModalIsOpen(true);
    console.log(map);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //업데이트, 삭제 함수들
  const handleInputChange = (e) =>
    setSelectedGps((prevSelectedGps) => ({
      ...prevSelectedGps,
      [e.target.name]: e.target.value,
    }));

  const onClickAddress = (e, gps) => {
    e.preventDefault();

    navermaps.Service.geocode(
      {
        address: gps,
      },
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          console.log("error");
          return alert("Something wrong!");
        }

        console.log(response.result);

        const result = response.result;
        const items = result.items;

        // 좌표를 gps에 저장
        // setGps({
        //   gpsLat: items[0].point.y,
        //   gpsLng: items[0].point.x,
        // });

        // gpsRequest 업데이트
        setSelectedGps((prevGpsrequest) => ({
          ...prevGpsrequest,
          gpsLat: items[0].point.y,
          gpsLng: items[0].point.x,
        }));
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, ...gpsRequest } = selectedGps;
    console.log(selectedGps);
    console.log(gpsRequest);

    try {
      const apiResponse = await axios.put(
        `http://localhost:8080/gps/update/${selectedGps.id}`, //id추가
        gpsRequest,
        { withCredentials: true }
      );

      console.log(apiResponse.data);
      alert("위치 정보 수정이 완료되었습니다!");
      setModalIsOpen(false);
      history.push("/map/list");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id, name) => {
    const isDeleted = MapDelete(id, name);
    if (isDeleted == 1) {
      history.push("/map/list");
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
            content: location,
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

      navermaps.Event.addListener(
        marker,
        "rightclick",
        getMouseRightClickHandler(index, map)
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
        <button onClick={() => markerClickHandler()}>Modal</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="GPS Update Modal"
      >
        <h2>좌표 상세정보</h2>
        <label>ID: {selectedGps.id}</label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={selectedGps.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={selectedGps.address}
            onChange={handleInputChange}
          />
          <button onClick={(e) => onClickAddress(e, selectedGps.address)}>
            GPS 변환
          </button>
        </label>
        <br />

        <label>
          위도: {selectedGps.gpsLat}, 경도: {selectedGps.gpsLng}
        </label>
        <br />

        <label>
          Date:
          <input
            type="text"
            name="date"
            value={selectedGps.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={selectedGps.subject}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Url:
          <input
            type="text"
            name="url"
            value={selectedGps.url}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={(e) => handleSubmit(e)}>위치 수정</button>
        <button onClick={() => handleDelete(selectedGps.id, selectedGps.name)}>
          삭제하기
        </button>

        <br />
        <br />
        <br />
        <div>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
};

export default MapList;

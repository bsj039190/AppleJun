import React, { useEffect, useState } from "react";
import { NaverMap, Marker, InfoWindow, useNavermaps } from "react-naver-maps";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Modal from "react-modal";
import MapDelete from "./MapDelete";
import "../css/app/UpperbarProfile.css";
import "../css/app/Background.css";
import "../css/app/MapList.css";
import DatePicker from "react-datepicker";

// 모달 스타일 설정
const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
  },
};

const MapList = () => {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const navermaps = useNavermaps();
  const [apiResponse, setApiResponse] = useState(null);
  const history = useHistory();

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGps, setSelectedGps] = useState({
    id: "2",
    name: "Default Name",
    address: "장승남로 70-30",
    date: "2024-04-01",
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

  const fetchProfile = async (e) => {
    const joon = await axios.get(`http://localhost:8080/account/get/1`, {
      withCredentials: true,
    });

    const joonData = joon.data.contents;
    if (joonData !== null) {
      console.log(joonData);
      setLeft({
        name: joonData.name,
        profileImage: extractFileNameAddPath(joonData.profileImage),
      });
    }

    const soo = await axios.get(`http://localhost:8080/account/get/2`, {
      withCredentials: true,
    });

    const sooData = soo.data.contents;
    if (sooData !== null) {
      console.log(sooData);
      setRight({
        name: sooData.name,
        profileImage: extractFileNameAddPath(sooData.profileImage),
      });
    }
  };

  const extractFileNameAddPath = (filePath) => {
    const parts = filePath.split(/[\\/]/);
    return parts.pop();
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

      // setModalIsOpen(true);
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
  const updateClickHandler = () => {
    setModalIsOpen(true);
    console.log(map);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedGps({
      ...selectedGps,
      date,
    });
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
    fetchProfile();

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
      <div
        id="n_1920__10"
        className="gradient-background"
        style={{ zIndex: -2 }}
      >
        <svg className="n_27_t">
          <linearGradient
            id="n_27_t"
            spreadMethod="pad"
            x1="0"
            x2="1"
            y1="0.5"
            y2="0.5"
          >
            <stop offset="0" stopColor="#ffe0e7" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#d6eaff" stopOpacity="1"></stop>
          </linearGradient>
          <rect
            id="n_27_t"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </div>

      <div className="upperbarLeftSubject">
        <img src="/logos/Map.png" style={{ width: "40px", height: "auto" }} />
        <p
          className="customTextColorAndShadow"
          style={{ display: "flex", marginLeft: "10px" }}
        >
          지도
        </p>
      </div>

      <div className="upperbarProfileGruop customTextColorAndShadow">
        <p>{left.name}</p>
        <img
          src={`/profile-image/${left.profileImage}`}
          alt="leftProfile"
          className="upperbarProfileGruopImg"
        />

        <a href="/home">
          <img
            src="/logos/Heart.png"
            alt="Heart"
            style={{ width: "50px", height: "50px" }}
          />
        </a>

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>

      <div className="mapListBigContainer">
        <div>
          <div id="map" className="mapListNaverMap" />
          {/* <div>
          <button onClick={() => history.push(`/home`)}>홈으로</button>
          <Link to="/map/text/list">
            <button>리스트로 보기</button>
          </Link>
          <button onClick={() => markerClickHandler()}>Modal</button>
        </div> */}

          <div className="mapListButton">
            <h4>장소 상세정보</h4>
            <Link to="/map/text/list">
              <button>리스트로 보기</button>
            </Link>
          </div>

          <div className="mapListInfoContainer">
            <div className="mapListInfoRow" style={{ marginTop: "10px" }}>
              <div className="mapListInfoItem">
                <label>
                  ID <p>{selectedGps.id}</p>
                </label>
              </div>
              <div className="mapListInfoItem">
                <label>
                  카테고리 <p>{selectedGps.subject}</p>
                </label>
              </div>
            </div>
            <div className="mapListInfoRow">
              <div className="mapListInfoItem">
                <label>
                  이름 <p>{selectedGps.name}</p>
                </label>
              </div>
              <div className="mapListInfoItem">
                <label>
                  주소 <p>{selectedGps.address}</p>
                </label>
              </div>
            </div>
            <div className="mapListInfoRow">
              <div className="mapListInfoItem">
                <label>
                  날짜{" "}
                  <p>
                    {selectedGps.date[0] +
                      "년 " +
                      selectedGps.date[1] +
                      "월 " +
                      selectedGps.date[2] +
                      "일"}
                  </p>
                </label>
              </div>
              <div
                className="mapListInfoItem"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label>
                  <button
                    onClick={() => window.open(selectedGps.url, "_blank")}
                    className="urlButton"
                  >
                    URL 이동
                  </button>
                  <button
                    onClick={() => updateClickHandler()}
                    className="updateButton"
                  >
                    수정
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(selectedGps.id, selectedGps.name)
                    }
                    className="deleteButton"
                  >
                    삭제
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="GPS Update Modal"
        className="mapUpdateModal"
      >
        <div className="mapUpdateCenter">
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "lighter",
              color: "#FFA8BC",
            }}
          >
            장소 수정
          </h2>
        </div>

        <div className="mapUpdateLabel">
          <label htmlFor="name">
            이름
            <input
              type="text"
              name="name"
              autocomplete="off"
              value={selectedGps.name}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="address">
            주소
            <input
              type="text"
              name="address"
              autocomplete="off"
              value={selectedGps.address}
              onChange={handleInputChange}
              style={{ width: "200px" }}
            />
            <button
              onClick={(e) => onClickAddress(e, selectedGps.address)}
              className="mapUpdateGpsButton"
            >
              GPS 변환
            </button>
          </label>

          <label>
            위도: {selectedGps.gpsLat}, 경도: {selectedGps.gpsLng}
          </label>

          <label>
            날짜
            <DatePicker
              value={selectedGps.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />
            {/* 아니 바뀌지가 않음, 배열 => 텍스트 가 안되는거같음 handleDateChange 함수 손봐야 할것같음 */}
          </label>

          <label htmlFor="subject">
            카테고리
            <input
              type="text"
              name="subject"
              value={selectedGps.subject}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="url">
            URL
            <input
              type="text"
              name="url"
              value={selectedGps.url}
              onChange={handleInputChange}
              style={{ width: "200px" }}
            />
          </label>
        </div>

        <div className="mapUpdateCenter">
          <button onClick={(e) => handleSubmit(e)} className="updateButton">
            위치 수정
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MapList;

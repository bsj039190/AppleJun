import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  Container,
} from "react-naver-maps";

import Modal from "react-modal";
import MapDelete from "./MapDelete";
import "../css/UpperbarProfile.css";
import "../css/Background.css";
import "../css/Modal.css";
import "../css/MapListAndUpdate.css";
import DatePicker from "react-datepicker";

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

Modal.setAppElement("#root");

function MapListAndUpdate() {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gpsList, setGpsList] = useState([]);
  const navermaps = useNavermaps();
  const [gps, setGps] = useState({
    gpsLat: 0,
    gpsLng: 0,
  });
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
  const [gpsRequest, setGpsrequest] = useState({
    name: selectedGps.name,
    address: selectedGps.address,
    date: "2000-01-01",
    gpsLat: 37.4436635,
    gpsLng: 126.7390452,
    subject: "Default Subject",
    url: "http://www.naver.com",
  });

  const [left, setLeft] = useState({
    name: "",
    profileImage: "",
  });

  const [right, setRight] = useState({
    name: "",
    profileImage: "",
  });

  const fetchProfile = async (e) => {
    const joon = await axios.get(`http://localhost:8080/account/get/1`, {
      withCredentials: true,
    });

    const joonData = joon.data.contents;
    if (joonData !== null) {
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

        const result = response.result;
        const items = result.items;

        // 좌표를 gps에 저장
        setGps({
          gpsLat: items[0].point.y,
          gpsLng: items[0].point.x,
        });

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
    try {
      const apiResponse = await axios.put(
        `http://localhost:8080/gps/update/${selectedGps.id}`, //id추가
        gpsRequest,
        { withCredentials: true }
      );

      alert("위치 정보 수정이 완료되었습니다!");
      setModalIsOpen(false);
      history.push("/map/list");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (gpsDate) => {
    const year = gpsDate.getFullYear();
    const month = ("0" + (gpsDate.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고 두 자리로 만듭니다.
    const day = ("0" + gpsDate.getDate()).slice(-2); // 일도 두 자리로 만듭니다.
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedGps({
      ...selectedGps,
      date: formattedDate,
    });
  };

  const handleInputChange = (e) => {
    setSelectedGps((prevSelectedGps) => {
      const updatedGps = {
        ...prevSelectedGps,
        [e.target.name]: e.target.value,
      };
      setGpsrequest(updatedGps); // setSelectedGps 이후에 호출
      return updatedGps; // 최종 업데이트된 값을 반환
    });
  };

  const deleteMap = (id, name) => {
    const isDeleted = MapDelete(id, name);
    if (isDeleted == 1) {
      history.push("/map/list");
    }
  };

  const openModal = (gps) => {
    setSelectedGps(gps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchGetPostList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gps/get/list", {
          withCredentials: true,
        });
        setGpsList(response.data.contents);
      } catch (error) {
        console.error("Error from get post list : ", error);
      }
    };

    fetchGetPostList();
    fetchProfile();
  }, []);

  return (
    <div>
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
            className="upperbarHeartLogo"
          />
        </a>

        <img
          src={`/profile-image/${right.profileImage}`}
          alt="rightProfile"
          className="upperbarProfileGruopImg"
        />
        <p>{right.name}</p>
      </div>

      <div className="mapListWhiteBaord">
        <div className="mapListWrapper">
          <div style={{ color: "#FFA8BC" }} className="mapListTitle">
            <h2 style={{ fontWeight: "initial" }}>좌표 리스트</h2>
          </div>

          <div>
            {gpsList.map(
              (gps) =>
                // gps.id가 1이 아닌 경우에만 렌더링
                gps.id !== 1 && (
                  <ul key={gps.id}>
                    <div className="mapListName">
                      <li>{gps.name}</li>
                    </div>
                    <div className="mapListAddress">
                      <p>
                        {gps.subject} / {gps.address} &nbsp;&nbsp;
                        <button onClick={() => openModal(gps)}>수정</button>
                        <button onClick={() => deleteMap(gps.id, gps.name)}>
                          삭제
                        </button>
                      </p>
                    </div>
                  </ul>
                )
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={"mapUpdateModal"}
        contentLabel="Gps Update Modal"
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
    </div>
  );
}

export default MapListAndUpdate;

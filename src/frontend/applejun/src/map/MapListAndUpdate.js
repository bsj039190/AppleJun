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
  }, []);

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
    const isConfirmed = MapDelete(id, name);
    if (isConfirmed == 1) {
      history.push("/map/list");
    }
  };

  const openModal = (gps) => {
    setSelectedGps(gps);
    console.log(gps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => history.push("/home")}>홈으로</button>
        <button onClick={() => history.push("/map/list")}>지도로 보기</button>
      </div>
      <h2>좌표 목록</h2>
      {gpsList.map(
        (gps) =>
          // gps.id가 1이 아닌 경우에만 렌더링
          gps.id !== 1 && (
            <ul key={gps.id}>
              <p>
                ID: {gps.id} / 이름: {gps.name} / 주소: {gps.address}{" "}
                <button onClick={() => openModal(gps)}>수정</button>
                <button onClick={() => deleteMap(gps.id, gps.name)}>
                  삭제
                </button>
              </p>
            </ul>
          )
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Gps Update Modal"
      >
        <h2>좌표 수정</h2>
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
        <button onClick={handleSubmit}>위치 수정</button>

        <br />
        <br />
        <br />
        <div>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
}

export default MapListAndUpdate;
